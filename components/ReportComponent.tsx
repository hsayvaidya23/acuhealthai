import React, { ChangeEvent, useState } from 'react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import Credits from './credits';
import { Toaster, toast } from 'sonner';

type Props = {
  onReportConfirmation: (data: string) => void;
};

const ReportComponent = ({ onReportConfirmation }: Props) => {
  const [base64Data, setBase64Data] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [reportData, setReportData] = useState('');

  function handleReportSelection(event: ChangeEvent<HTMLInputElement>): void {
    if (!event.target.files) return;

    const file = event.target.files[0];

    if (file) {
      const validImages = ['image/jpeg', 'image/png', 'image/webp'];
      const validDocs = ['application/pdf'];
      const isValidImage = validImages.includes(file.type);
      const isValidDoc = validDocs.includes(file.type);

      if (!(isValidImage || isValidDoc)) {
        toast.error('Filetype not supported!');
        return;
      }

      const reader = new FileReader();

      reader.onloadend = () => {
        const base64String = reader.result as string;
        setBase64Data(base64String);
        console.log(base64String);
      };

      if (isValidImage) {
        compressImage(file, (compressedFile) => {
          reader.readAsDataURL(compressedFile);
        });
      } else if (isValidDoc) {
        reader.readAsDataURL(file);
      }
    }
  }

  function compressImage(file: File, callback: (compressedFile: File) => void) {
    const reader = new FileReader();

    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        canvas.width = img.width;
        canvas.height = img.height;

        ctx!.drawImage(img, 0, 0);

        const quality = 0.1;
        const dataURL = canvas.toDataURL('image/jpeg', quality);

        const byteString = atob(dataURL.split(',')[1]);
        const ab = new ArrayBuffer(byteString.length);
        const ia = new Uint8Array(ab);
        for (let i = 0; i < byteString.length; i++) {
          ia[i] = byteString.charCodeAt(i);
        }
        const compressedFile = new File([ab], file.name, { type: 'image/jpeg' });

        callback(compressedFile);
      };
      img.src = e.target!.result as string;
    };

    reader.readAsDataURL(file);
  }

  async function extractDetails(): Promise<void> {
    if (!base64Data) {
      toast.error('Upload a valid report!');
      return;
    }
    setIsLoading(true);

    const response = await fetch('api/extractreportgemini', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        base64: base64Data,
      }),
    });

    if (response.ok) {
      const reportText = await response.text();
      console.log(reportText);
      setReportData(reportText);
    } else {
      toast.error('Failed to extract report details.');
    }

    setIsLoading(false);
  }

  return (
    <div className="grid w-full items-start gap-6 overflow-auto p-4 pt-0">
      <fieldset className="relative grid gap-6 rounded-lg border p-4">
        <legend className="text-sm font-medium">Report</legend>
        {isLoading && (
          <div className="absolute z-10 h-full w-full bg-card/90 rounded-lg flex flex-row items-center justify-center">
            extracting...
          </div>
        )}
        <Input type="file" onChange={handleReportSelection} />
        <Button onClick={extractDetails}>1. Upload File</Button>
        <Label>Report Summary</Label>
        <Textarea
          value={reportData}
          onChange={(e) => {
            setReportData(e.target.value);
          }}
          placeholder="Extracted data from the report will appear here. Get better recommendations by providing additional patient history and symptoms..."
          className="min-h-72 resize-none border-0 p-3 shadow-none focus-visible:ring-0"
        />
        <Button
          variant="destructive"
          className="bg-[#D90013]"
          onClick={() => {
            onReportConfirmation(reportData);
          }}
        >
          2. Looks Good
        </Button>
        <div className="flex flex-row items-center justify-center gap-2 p-4">
          {/* <Label>Share your thoughts </Label> */}
              <Credits />
        </div>
      </fieldset>
    </div>
  );
};

export default ReportComponent;


