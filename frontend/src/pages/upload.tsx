// 📁 src/pages/Upload.tsx
import { useState } from 'react';

export default function Upload() {
    const [file, setFile] = useState<File | null>(null);
    const [name, setName] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!file) return;

        const formData = new FormData();
        formData.append('file', file);
        formData.append('name', name);

        const res = await fetch('http://localhost:3001/upload', {
            method: 'POST',
            body: formData,
        });

        if (res.ok) {
            alert('Upload erfolgreich!');
            setFile(null);
            setName('');
        } else {
            alert('Fehler beim Upload');
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="max-w-md mx-auto bg-white p-6 rounded shadow"
        >
            <h2 className="text-lg font-semibold mb-4">Asset hochladen</h2>
            <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Asset-Name"
                className="border p-2 w-full mb-4"
                required
            />
            <label className="border-1 cursor-pointer rounded-md p-2 flex justify-center items-center">
                Select File
                <input
                    type="file"
                    onChange={(e) => setFile(e.target.files?.[0] || null)}
                    className="hidden"
                    required
                />
            </label>
            <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
                Hochladen
            </button>
        </form>
    );
}