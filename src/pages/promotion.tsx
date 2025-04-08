import { Avatar, Box, Button, Divider, FormControlLabel, Grid, Paper, Radio, RadioGroup, TextField, Typography } from "@mui/material"
import Layout from "../components/layout/layout"
import gradimg from "../assets/logo gradient.svg"
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useEffect, useState } from 'react';

export const PromotionPage = () => {
    const [previewUrls, setPreviewUrls] = useState<string[]>([]);

    const formik = useFormik({
        initialValues: {
            postText: '',
            media: [] as File[],
            headline: '',
            url: '',
            mediaType: 'carousel' as 'single' | 'carousel',
        },
        validationSchema: Yup.object({
            postText: Yup.string().required('Required'),
            media: Yup.array().min(1, 'At least one media file is required').required('Required'),
            headline: Yup.string().required('Required'),
            url: Yup.string().url('Invalid URL').required('Required'),
            mediaType: Yup.string().oneOf(['single', 'carousel']).required(),
        }),
        onSubmit: async values => {
            console.log(values)
            const formData = new FormData();
            formData.append('postText', values.postText);
            values.media.forEach(file => formData.append('media', file));
            formData.append('headline', values.headline);
            formData.append('url', values.url);
            formData.append('mediaType', values.mediaType);

            try {
                const response = await fetch('/api/posts', {
                    method: 'POST',

                    body: formData,
                });
                if (!response.ok) throw new Error('Failed to post');
                alert('Post submitted successfully!');
            } catch (error) {
                console.error('Submit error:', error);
                alert('There was an error submitting your post.');
            }
        },
    });

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.currentTarget.files;
        if (!files) return;

        const fileArray = Array.from(files);
        const maxFiles = formik.values.mediaType === 'carousel' ? 6 : 1;
        const selectedFiles = fileArray.slice(0, maxFiles);

        formik.setFieldValue('media', selectedFiles);
        setPreviewUrls(selectedFiles.map(file => URL.createObjectURL(file)));
    };

    useEffect(() => {
        return () => {
            previewUrls.forEach(url => URL.revokeObjectURL(url));
        };
    }, [previewUrls]);

    return <Layout>
        <section id="promotion" className="bg-[rgb(249,244,244)] pt-3">
            <img src={gradimg} alt="sportlaze logo" className="ml-3" />
            <Box display="flex" flexDirection={{ xs: "column", lg: "row" }} minHeight="100vh" bgcolor="#f9f4f4">
                {/* Sidebar */}
                <Box width={{ xs: "100%", lg: "20%" }} p={3} color="blue" fontWeight="500">
                    <Typography borderLeft={"4px solid blue"} pl={1} mb={2}>Post Details</Typography>
                    <Typography pl={1} mb={2}>Ads Target</Typography>
                    <Typography pl={1}>Payment</Typography>
                </Box>

                {/* Main Content */}
                <Box flex={1} p={3} mb={3} borderBottom={3}>
                    <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                        <Typography variant="h5" fontWeight="600" color="primary">Post details</Typography>
                        <Box display="flex" gap={2} fontSize="0.9rem">
                            <Button variant="text" sx={{ color: 'black', textTransform: 'capitalize', textDecoration: 'underline' }}>Use existing ad</Button>
                            <Button variant="text" sx={{ color: 'black', textTransform: 'capitalize', textDecoration: 'underline' }}>+ Create New Ad</Button>
                            <Button variant="text" sx={{ color: 'black', textTransform: 'capitalize', textDecoration: 'underline' }}>📋 Copy ad</Button>
                            <Button variant="text" color="error" sx={{ color: 'black', textTransform: 'capitalize', textDecoration: 'underline' }}>🗑 Delete</Button>
                        </Box>
                    </Box>

                    <div className="flex">

                        {/* Form Card */}
                        <div>
                            <Paper variant="outlined" sx={{ borderColor: 'transparent', p: 3, }}>
                                <Box display="flex" alignItems="center" gap={2} mb={2}>
                                    <Avatar src="https://via.placeholder.com/40">S</Avatar>
                                    <Box display={"flex"} gap={1}>
                                        <Typography fontWeight={600}>Johnson Doe</Typography>
                                        <Typography variant="body2" color="text.secondary">@johnsondoe1</Typography>
                                    </Box>
                                </Box>

                                <form
                                    onSubmit={formik.handleSubmit}
                                    className="max-w-md mx-auto mt-10 space-y-4 font-sans text-sm"
                                >
                                    <textarea
                                        name="postText"
                                        placeholder="What is happening?"
                                        onChange={formik.handleChange}
                                        value={formik.values.postText}
                                        className="w-full h-24 p-3 border border-blue-600 rounded-lg focus:outline-none"
                                    />

                                    <div className="flex space-x-2">
                                        <div
                                            className={`w-1/2 p-4 border rounded-lg cursor-pointer ${formik.values.mediaType === 'single' ? 'border-blue-600' : 'border-blue-300'}`}
                                            onClick={() => formik.setFieldValue('mediaType', 'single')}
                                        >
                                            <div className="flex items-center justify-between">
                                                <span className="font-semibold">Single Media</span>
                                                <div className="w-3 h-3 border border-blue-600 rounded-full flex items-center justify-center">
                                                    {formik.values.mediaType === 'single' && <div className="w-2 h-2 bg-blue-600 rounded-full" />}
                                                </div>
                                            </div>
                                            <p className="text-xs mt-1">1 photo or video</p>
                                        </div>
                                        <div
                                            className={`w-1/2 p-4 border rounded-lg cursor-pointer ${formik.values.mediaType === 'carousel' ? 'border-blue-600' : 'border-blue-300'}`}
                                            onClick={() => formik.setFieldValue('mediaType', 'carousel')}
                                        >
                                            <div className="flex items-center justify-between">
                                                <span className="font-semibold">Carousel</span>
                                                <div className="w-3 h-3 border border-blue-600 rounded-full flex items-center justify-center">
                                                    {formik.values.mediaType === 'carousel' && <div className="w-2 h-2 bg-blue-600 rounded-full" />}
                                                </div>
                                            </div>
                                            <p className="text-xs mt-1">2-6 photo or video</p>
                                        </div>
                                    </div>

                                    <div className="border border-blue-600 rounded-lg p-2 space-y-2">
                                        <div className="flex items-center border border-blue-600 rounded-lg px-3 py-2">
                                            <input
                                                type="text"
                                                placeholder="Media"
                                                value={formik.values.media.length ? `${formik.values.media.length} file(s) selected` : ''}
                                                disabled
                                                className="flex-1 outline-none bg-transparent cursor-default"
                                            />
                                            <label className="text-black underline text-sm cursor-pointer">
                                                Upload
                                                <input
                                                    type="file"
                                                    accept="image/*,video/*"
                                                    multiple={formik.values.mediaType === 'carousel'}
                                                    onChange={handleFileChange}
                                                    className="hidden"
                                                />
                                            </label>
                                        </div>

                                        {previewUrls.length > 0 && (
                                            <div className="grid grid-cols-2 gap-2">
                                                {previewUrls.map((url, index) => (
                                                    <div key={index} className="border border-blue-300 rounded-lg overflow-hidden">
                                                        {formik.values.media[index]?.type.startsWith('image') ? (
                                                            <img src={url} alt={`preview-${index}`} className="w-full h-auto max-h-40 object-contain" />
                                                        ) : (
                                                            <video controls className="w-full max-h-40">
                                                                <source src={url} />
                                                                Your browser does not support the video tag.
                                                            </video>
                                                        )}
                                                    </div>
                                                ))}
                                            </div>
                                        )}

                                        <input
                                            name="headline"
                                            placeholder="Headline"
                                            onChange={formik.handleChange}
                                            value={formik.values.headline}
                                            className="w-full border border-blue-600 rounded-lg px-3 py-2 outline-none"
                                        />
                                        <input
                                            name="url"
                                            placeholder="Website Url"
                                            onChange={formik.handleChange}
                                            value={formik.values.url}
                                            className="w-full border border-blue-600 rounded-lg px-3 py-2 outline-none"
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                                    >
                                        Post
                                    </button>
                                </form>
                            </Paper>
                        </div>

                        {/* Preview Card */}
                        <div >
                            <Paper variant="outlined" sx={{ borderColor: 'blue', p: 3, borderRadius: '1rem', width: '20rem' }}>
                                <Box display="flex" alignItems="center" gap={2} mb={2}>
                                    <Avatar src="https://via.placeholder.com/40" />
                                    <Box>
                                        <Typography fontWeight={600}>Johnson Doe</Typography>
                                        <Typography variant="body2" color="text.secondary">@johnsondoe1</Typography>
                                    </Box>
                                </Box>
                                <Typography fontStyle="italic" color="text.secondary" mb={2}>What is happening?</Typography>
                                <Box height={250} bgcolor="#ccc" borderRadius={2} mb={2} />
                                <Typography variant="body2" mb={1}>Headline</Typography>
                                <Typography variant="caption" fontStyle="italic" color="text.secondary">From website.com</Typography>
                                <Divider sx={{ my: 2 }} />
                                <Box display="flex" justifyContent="space-between" fontSize="1.25rem">
                                    <span>♡</span>
                                    <span>💬</span>
                                    <span>📤</span>
                                    <span>🔖</span>
                                </Box>
                                <Typography variant="caption" color="primary" fontWeight={500} mt={2}>📣 Promoted</Typography>
                            </Paper>
                        </div>
                    </div>
                </Box>
            </Box>
        </section>
    </Layout>
}