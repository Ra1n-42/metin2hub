import { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { AlertTriangle, Flag } from "lucide-react";

interface ReportDialogProps {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
    assetName: string;
    assetId: number;
}

const reportReasons = [
    { value: "inappropriate", label: "Inappropriate Content" },
    { value: "copyright", label: "Copyright Infringement" },
    { value: "spam", label: "Spam or Misleading" },
    { value: "malware", label: "Malicious Software" },
    { value: "other", label: "Other" },
];

export function ReportDialog({ isOpen, onOpenChange, assetName, assetId }: ReportDialogProps) {
    const [selectedReason, setSelectedReason] = useState("");
    const [description, setDescription] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!selectedReason) {
            return;
        }

        setIsSubmitting(true);

        try {
            // Hier würdest du den Report an deine API senden
            console.log("Report submitted:", {
                assetId,
                assetName,
                reason: selectedReason,
                description,
            });

            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Reset form and close dialog
            setSelectedReason("");
            setDescription("");
            onOpenChange(false);

            // Optional: Show success message
            // toast.success("Report submitted successfully");

        } catch (error) {
            console.error("Failed to submit report:", error);
            // Optional: Show error message
            // toast.error("Failed to submit report");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleCancel = () => {
        setSelectedReason("");
        setDescription("");
        onOpenChange(false);
    };

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <Flag className="h-5 w-5 text-red-500" />
                        Report Asset
                    </DialogTitle>
                    <DialogDescription>
                        Report "{assetName}" for violating community guidelines. Your report will be reviewed by our moderation team.
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-3">
                        <Label className="text-sm font-medium">Reason for reporting</Label>
                        <RadioGroup value={selectedReason} onValueChange={setSelectedReason}>
                            {reportReasons.map((reason) => (
                                <div key={reason.value} className="flex items-center space-x-2">
                                    <RadioGroupItem value={reason.value} id={reason.value} />
                                    <Label htmlFor={reason.value} className="text-sm cursor-pointer">
                                        {reason.label}
                                    </Label>
                                </div>
                            ))}
                        </RadioGroup>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="description" className="text-sm font-medium">
                            Additional Details (Optional)
                        </Label>
                        <Textarea
                            id="description"
                            placeholder="Please provide more details about your report..."
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="min-h-[80px]"
                        />
                    </div>

                    <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-3">
                        <div className="flex gap-2">
                            <AlertTriangle className="h-4 w-4 text-yellow-600 dark:text-yellow-500 mt-0.5 flex-shrink-0" />
                            <p className="text-xs text-yellow-800 dark:text-yellow-200">
                                False reports may result in restrictions on your account. Please only report content that genuinely violates our guidelines.
                            </p>
                        </div>
                    </div>

                    <div className="flex gap-3 pt-2">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={handleCancel}
                            className="flex-1"
                            disabled={isSubmitting}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            variant="destructive"
                            className="flex-1"
                            disabled={!selectedReason || isSubmitting}
                        >
                            {isSubmitting ? "Submitting..." : "Submit Report"}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}