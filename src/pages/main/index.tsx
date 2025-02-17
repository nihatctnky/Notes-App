import { FC, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { PageContainer } from '../../components/container/index';
import { Grid, Stack } from '@mui/system';
import { Alert, Button, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import Filter from './filter';
import NoteCard from './note-card';

const Main: FC = () => {
    const { notes } = useSelector((store: RootState) => store.notes);

    const [title, setTitle] = useState<string>("");
    const [selectedTags, setSelectedTags] = useState<string[]>([])

    //   1 Not başlıgı 1 inputta aratılan metni içermeli
    //   2.2 inputta seçilen etiketlein herbiri notenun etiketlerinin biriyle 

    const filtredNotes = notes.filter((note) =>
        note.title.toLowerCase().includes(title.toLowerCase()) &&
        selectedTags.every((sTag) => note.tags.some((nTag) => nTag === sTag)))

    return (

        <PageContainer>
            <Stack direction="row" alignItems="center" justifyContent="space-between">
                <Stack direction="row" gap={1}>
                    <img src="/logo.png" width={50} />
                    <Typography variant='h4'>Notlar</Typography>
                </Stack>

                <Button component={Link} to="/new" variant='contained' color="info" href='/new'>Oluştur</Button>
            </Stack>

            <Filter setTitle={setTitle} setSelectedTags={setSelectedTags} />

            <Grid container spacing={2} marginTop={5} >
                {filtredNotes.length < 1 ? (
                    <Grid size={12}>
                        <Alert color="warning">Not Bulunamadı</Alert>
                    </Grid>
                ) : (
                    filtredNotes.map((note) => (
                        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                            <NoteCard key={note.id} note={note} />
                        </Grid>
                    ))
                )}
            </Grid>
        </PageContainer>


    );
};

export default Main;
