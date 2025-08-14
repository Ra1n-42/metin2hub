import { useState } from "react";
import {
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogClose
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { AlertTriangle, Flag } from "lucide-react";

interface ReportDialogProps {
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

export function ReportDialogContent({ assetName, assetId }: ReportDialogProps) {
    const [selectedReason, setSelectedReason] = useState("");
    const [description, setDescription] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!selectedReason) return;

        setIsSubmitting(true);

        try {
            console.log("Report submitted:", {
                assetId,
                assetName,
                reason: selectedReason,
                description,
            });

            // Fake API delay
            await new Promise((resolve) => setTimeout(resolve, 1000));

            // Reset
            setSelectedReason("");
            setDescription("");

            // Optional: toast.success("Report submitted successfully");
        } catch (error) {
            console.error("Failed to submit report:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                    <Flag className="h-5 w-5 text-red-500" />
                    Report Asset (currently no Backend)
                </DialogTitle>
                <DialogDescription>
                    Report "{assetName}" for violating community guidelines. Your report
                    will be reviewed by our moderation team.
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

                <div className="space-y-2 sm:max-w-[375px]">
                    <Label htmlFor="description" className="text-sm font-medium">
                        Additional Details (Optional)
                    </Label>
                    <div className="relative">

                        <Textarea
                            id="description"
                            placeholder="Please provide more details about your report..."
                            value={description}
                            onChange={(e) => {
                                if (e.target.value.length <= 255) {
                                    setDescription(e.target.value);
                                }
                            }}
                            className="min-h-[80px]"
                        />
                        <p className="absolute bottom-2 right-2 text-sm text-gray-500">
                            {description.length} / 255
                        </p>
                    </div>
                </div>

                <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-3 sm:max-w-[375px]">
                    <div className="flex gap-2">
                        <AlertTriangle className="h-4 w-4 text-yellow-600 dark:text-yellow-500 mt-0.5 flex-shrink-0" />
                        <p className="text-xs text-yellow-800 dark:text-yellow-200">
                            False reports may result in restrictions on your account. Please
                            only report content that genuinely violates our guidelines.
                        </p>
                    </div>
                </div>

                <div className="flex gap-3 pt-2">
                    <DialogClose asChild>

                        <Button
                            type="button"
                            variant="outline"
                            className="flex-1 cursor-pointer"
                            onClick={() => {
                                setSelectedReason("");
                                setDescription("");
                            }}
                            disabled={isSubmitting}
                        >
                            Cancel
                        </Button>
                    </DialogClose>
                    <Button
                        type="submit"
                        variant={`${selectedReason ? "outline" : "destructive"}`}

                        className={`flex-1 ${selectedReason ? "hover:cursor-pointer" : ""}`}

                        disabled={!selectedReason || isSubmitting}
                    >
                        {isSubmitting ? "Submitting..." : "Submit Report"}
                    </Button>
                </div>
            </form>
        </DialogContent>
    );
}
