import pdfParse from 'pdf-parse';

// POST /upload-resume
// Upload a PDF resume and return extracted text
export const uploadResume = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'Resume PDF file is required' });
    }

    const pdfBuffer = req.file.buffer;
    const pdfData = await pdfParse(pdfBuffer);
    const resumeText = pdfData.text || '';

    if (!resumeText.trim()) {
      return res.status(400).json({ message: 'Could not extract text from the resume PDF' });
    }

    return res.status(200).json({ resumeText });
  } catch (error) {
    console.error('Error uploading/parsing resume:', error);
    return next(error);
  }
};

