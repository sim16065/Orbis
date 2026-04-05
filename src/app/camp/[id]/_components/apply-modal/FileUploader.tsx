import React, { useState } from "react";

interface FileUploaderProps {
    files: File[];
    onAddFiles: (files: File[]) => void;
    onRemoveFile: (index: number) => void;
}

export const FileUploader: React.FC<FileUploaderProps> = ({ files, onAddFiles, onRemoveFile }) => {
    const [isDragging, setIsDragging] = useState(false);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            onAddFiles(Array.from(e.target.files));
            e.target.value = '';
        }
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => setIsDragging(false);

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        if (e.dataTransfer.files) {
            onAddFiles(Array.from(e.dataTransfer.files));
        }
    };

    const formatSize = (bytes: number) => {
        if (bytes === 0) return '0 B';
        const k = 1024;
        const sizes = ['B', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
    };

    return (
        <div>
            <div className="flex items-end justify-between mb-2">
                <label className="block text-sm font-bold text-text mb-0">파일 첨부</label>
            </div>

            <div className="space-y-3 mb-3">
                {files.map((file, idx) => (
                    <div key={idx} className="flex items-center justify-between p-4 bg-text/5 border border-text/10 rounded-xl animate-in slide-in-from-top-1 duration-200">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-background rounded-lg flex items-center justify-center border border-text/10 shrink-0">
                                <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                            </div>
                            <div className="truncate">
                                <p className="text-sm font-bold text-text mb-0.5 tracking-tight truncate">{file.name}</p>
                                <p className="text-xs text-text/50 font-medium">{formatSize(file.size)}</p>
                            </div>
                        </div>
                        <button onClick={() => onRemoveFile(idx)} className="p-2 text-text/40 hover:text-red-400 transition-colors">
                            <span className="text-xl leading-none">×</span>
                        </button>
                    </div>
                ))}
            </div>

            <label
                className={`cursor-pointer border-2 border-dashed transition-all duration-200 rounded-xl p-5 flex items-center justify-center gap-2 group w-full text-center ${isDragging
                    ? 'border-primary bg-primary/5 scale-[1.02]'
                    : 'border-text/10 hover:border-text/30 hover:bg-text/[0.02]'
                    }`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
            >
                <svg className={`w-5 h-5 transition-colors ${isDragging ? 'text-primary' : 'text-text/40 group-hover:text-text'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
                <span className={`text-sm font-bold transition-colors ${isDragging ? 'text-primary' : 'text-text/60 group-hover:text-text'}`}>
                    {isDragging ? '업로드' : '파일 선택 또는 드래그'}
                </span>
                <input type="file" multiple onChange={handleFileChange} className="hidden" accept=".pdf,.doc,.docx,.zip,.jpg,.png" />
            </label>
        </div>
    );
};
