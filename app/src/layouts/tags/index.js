import React, { useState } from 'react';
import {
    Box,
    Button,
    Card,
    CardContent,
    Chip,
    Container,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    Grid,
    IconButton,
    TextField,
    Typography,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout';
import DashboardNavbar from 'examples/Navbars/DashboardNavbar';

const Tags = () => {
    const [tags, setTags] = useState([]);
    const [newTag, setNewTag] = useState('');
    const [newComment, setNewComment] = useState('');
    const [editTag, setEditTag] = useState(null);
    const [openEditDialog, setOpenEditDialog] = useState(false);

    const handleTagChange = (event) => {
        setNewTag(event.target.value);
    };

    const handleCommentChange = (event) => {
        setNewComment(event.target.value);
    };

    const handleAddTag = () => {
        const tag = {
            id: Date.now(),
            comment: newComment,
        };

        setTags([...tags, tag]);
        setNewTag('');
        setNewComment('');
    };

    const handleEditTag = (tag) => {
        setEditTag(tag);
        setNewComment(tag.comment);
        setOpenEditDialog(true);
    };

    const handleSaveEditTag = () => {
        const updatedTags = tags.map((tag) =>
            tag.id === editTag.id ? { ...tag, comment: newComment } : tag
        );
        setTags(updatedTags);
        handleCloseEditDialog();
    };

    const handleCloseEditDialog = () => {
        setOpenEditDialog(false);
        setEditTag(null);
        setNewComment('');
    };

    const handleDeleteTag = (id) => {
        const updatedTags = tags.filter((tag) => tag.id !== id);
        setTags(updatedTags);
    };

    const cardContentStyle = {
        paddingTop: 24,
    }

    const titleStyle = {
        marginBottom: 24,
    }


    return (
        <DashboardLayout>
            <DashboardNavbar />
            <Container maxWidth="md">
                <Box my={4}>
                    <Typography variant="h5" component="h1" align="center" style={titleStyle} gutterBottom>
                        Ajouter un Tag
                    </Typography>
                    <Card>
                        <CardContent style={cardContentStyle}>
                            <Grid container spacing={2} alignItems="center" justifyContent="center">
                                <Grid item xs={12} sm={12}>
                                    <FormControl fullWidth>
                                        <TextField
                                            label="Comment"
                                            value={newComment}
                                            onChange={handleCommentChange}
                                            fullWidth
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={12}>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={handleAddTag}
                                        disabled={!newComment}
                                        fullWidth
                                    >
                                        Add Tag
                                    </Button>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>

                    <Box mt={4} display="flex" justifyContent="center" flexWrap="wrap">
                        {tags.map((tag) => (
                            <Chip
                                key={tag.id}
                                label={tag.comment}
                                onDelete={() => handleDeleteTag(tag.id)}
                                onClick={() => handleEditTag(tag)}
                                variant="outlined"
                                sx={{ m: 1, cursor: 'pointer' }}
                                deleteIcon={<EditIcon />}
                            />
                        ))}
                    </Box>
                </Box>
                <Dialog open={openEditDialog} onClose={handleCloseEditDialog}>
                    <DialogTitle>Edit Tag</DialogTitle>
                    <DialogContent>
                        <FormControl fullWidth>
                            <TextField
                                label="Comment"
                                value={newComment}
                                onChange={handleCommentChange}
                                fullWidth
                            />
                        </FormControl>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseEditDialog}>Cancel</Button>
                        <Button onClick={handleSaveEditTag} color="primary">
                            Save
                        </Button>
                    </DialogActions>
                </Dialog>
            </Container>
        </DashboardLayout>
    );
};

export default Tags;
