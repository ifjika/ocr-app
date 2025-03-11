import React, { useState } from 'react';
import Tesseract from 'tesseract.js';

const App = () => {
	const [image, setImage] = useState(null);
	const [text, setText] = useState('');
	const [isProcessing, setIsProcessing] = useState(false);

	const handleImageUpload = (e) => {
		const file = e.target.files[0];
		setImage(URL.createObjectURL(file));
	};

	const handleScan = () => {
		if (image) {
			setIsProcessing(true);
			Tesseract.recognize(image, 'ind', {
				logger: (m) => console.log(m),
			}).then(({ data: { text } }) => {
				setText(text);
				setIsProcessing(false);
			});
		}
	};

	return (
		<div style={{ textAlign: 'center', marginTop: '50px' }}>
			<h1>OCR Screener</h1>
			<p>Upload gambar KTP atau struk belanja untuk memulai scanning</p>

			{/* Input untuk upload gambar  */}
			<input
				type="file"
				accept="image/*"
				onChange={handleImageUpload}
			/>

			{/* Button untuk processing OCR */}
			<button
				onClick={handleScan}
				disabled={isProcessing}>
				{isProcessing ? 'Processing' : 'Scan Gambar'}
			</button>

			{/* Menampilkan gambar yang diupload */}
			{image && (
				<img
					src={image}
					alt="Uploaded Image"
					style={{ width: '50%', marginTop: '20px' }}
				/>
			)}

			{/* Menampilkan hasil OCR */}
			{text && (
				<div style={{ marginTop: '30px' }}>
					<h3>Hasil OCR :</h3>
					<pre>{text}</pre>
				</div>
			)}
		</div>
	);
};

export default App;
