
import React, { useState } from 'react';
import { Upload, X, Image, AlertCircle } from 'lucide-react';

interface ImageUploadProps {
  files: File[];
  onFilesChange: (files: File[]) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ files, onFilesChange }) => {
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState<string>("");

  const MAX_TOTAL_SIZE = 25 * 1024 * 1024; // 25MB
  const ALLOWED_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

  const validateFiles = (newFiles: FileList | null) => {
    if (!newFiles) return [];

    const validFiles: File[] = [];
    let totalSize = files.reduce((acc, file) => acc + file.size, 0);
    let errorMessage = "";

    Array.from(newFiles).forEach(file => {
      // Check file type
      if (!ALLOWED_TYPES.includes(file.type)) {
        errorMessage = `${file.name} is not a valid image type. Please use JPG, PNG, or WebP.`;
        return;
      }

      // Check total size
      if (totalSize + file.size > MAX_TOTAL_SIZE) {
        errorMessage = `Adding ${file.name} would exceed the 25MB limit. Please reduce file sizes.`;
        return;
      }

      validFiles.push(file);
      totalSize += file.size;
    });

    setError(errorMessage);
    return validFiles;
  };

  const handleFileUpload = (newFiles: FileList | null) => {
    const validFiles = validateFiles(newFiles);
    if (validFiles.length > 0) {
      onFilesChange([...files, ...validFiles]);
      setError("");
    }
  };

  const removeFile = (index: number) => {
    onFilesChange(files.filter((_, i) => i !== index));
    setError("");
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    handleFileUpload(e.dataTransfer.files);
  };

  const getTotalSize = () => {
    const totalBytes = files.reduce((acc, file) => acc + file.size, 0);
    const totalMB = (totalBytes / (1024 * 1024)).toFixed(1);
    return `${totalMB} MB`;
  };

  return (
    <div className="space-y-4">
      <div className="text-center">
        <h3 className="text-2xl font-semibold text-white mb-2">
          Upload Images for Your Website
        </h3>
        <p className="text-white/70 text-lg">
          Share any photos you'd like us to use in your website design
        </p>
      </div>
      
      <div
        className={`border-2 border-dashed rounded-xl p-8 text-center transition-all ${
          dragActive 
            ? 'border-orange-400 bg-orange-500/20 scale-102' 
            : 'border-white/30 hover:border-orange-400/60 hover:bg-white/5'
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <Upload className="w-16 h-16 text-white/60 mx-auto mb-6" />
        <p className="text-white/80 mb-4 text-lg">
          Drag and drop your images here, or{' '}
          <label className="text-orange-400 cursor-pointer hover:text-orange-300 font-semibold underline">
            browse files
            <input
              type="file"
              multiple
              onChange={(e) => handleFileUpload(e.target.files)}
              accept="image/jpeg,image/jpg,image/png,image/webp"
              className="hidden"
            />
          </label>
        </p>
        <div className="space-y-2 text-white/60">
          <p className="text-sm">
            Supported formats: JPG, PNG, WebP
          </p>
          <p className="text-sm">
            Maximum total size: 25MB | Current: {getTotalSize()} / 25.0 MB
          </p>
        </div>
      </div>

      {error && (
        <div className="flex items-center space-x-2 p-4 bg-red-500/20 border border-red-500/50 rounded-lg">
          <AlertCircle className="w-5 h-5 text-red-300" />
          <p className="text-red-200">{error}</p>
        </div>
      )}

      {files.length > 0 && (
        <div className="space-y-3">
          <h4 className="font-semibold text-white text-lg">Uploaded Images ({files.length}):</h4>
          <div className="grid gap-3 max-h-60 overflow-y-auto">
            {files.map((file, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20">
                <div className="flex items-center space-x-3">
                  <Image className="w-5 h-5 text-orange-400" />
                  <div>
                    <span className="text-white font-medium">{file.name}</span>
                    <p className="text-white/60 text-sm">
                      {(file.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => removeFile(index)}
                  className="text-red-400 hover:text-red-300 transition-colors p-1"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
