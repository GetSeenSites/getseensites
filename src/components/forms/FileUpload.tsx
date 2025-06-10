
import React, { useState } from 'react';
import { Upload, X, FileText, Image, File } from 'lucide-react';

interface FileUploadProps {
  files: File[];
  onFilesChange: (files: File[]) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ files, onFilesChange }) => {
  const [dragActive, setDragActive] = useState(false);

  const handleFileUpload = (newFiles: FileList | null) => {
    if (newFiles) {
      const allowedTypes = ['image/', 'application/pdf', 'text/', '.txt'];
      const validFiles = Array.from(newFiles).filter(file => {
        return allowedTypes.some(type => file.type.startsWith(type) || file.name.endsWith('.txt'));
      });
      
      onFilesChange([...files, ...validFiles]);
    }
  };

  const removeFile = (index: number) => {
    onFilesChange(files.filter((_, i) => i !== index));
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

  const getFileIcon = (file: File) => {
    if (file.type.startsWith('image/')) return <Image className="w-4 h-4" />;
    if (file.type === 'application/pdf') return <FileText className="w-4 h-4" />;
    return <File className="w-4 h-4" />;
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900">Upload Your Files</h3>
      <p className="text-gray-600">Upload photos, PDFs, or text files to help us create your perfect website</p>
      
      <div
        className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
          dragActive ? 'border-orange-500 bg-orange-50' : 'border-gray-300 hover:border-orange-400'
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <p className="text-gray-600 mb-4">
          Drag and drop your files here, or{' '}
          <label className="text-orange-500 cursor-pointer hover:text-orange-600">
            browse
            <input
              type="file"
              multiple
              onChange={(e) => handleFileUpload(e.target.files)}
              accept="image/*,.pdf,.txt,text/*"
              className="hidden"
            />
          </label>
        </p>
        <p className="text-sm text-gray-500">
          Supported formats: Images, PDFs, Text files
        </p>
      </div>

      {/* File List */}
      {files.length > 0 && (
        <div className="space-y-2">
          <h4 className="font-medium text-gray-900">Uploaded Files:</h4>
          {files.map((file, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                {getFileIcon(file)}
                <span className="text-gray-700">{file.name}</span>
                <span className="text-sm text-gray-500">
                  ({(file.size / 1024 / 1024).toFixed(2)} MB)
                </span>
              </div>
              <button
                type="button"
                onClick={() => removeFile(index)}
                className="text-red-500 hover:text-red-700"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FileUpload;
