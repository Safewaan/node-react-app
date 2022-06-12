import * as React from 'react';
import { styled } from '@material-ui/core/styles';
import Grid from "@material-ui/core/Grid";
import Paper from '@material-ui/core/Paper';
import Typography from "@material-ui/core/Typography";
import InputLabel from '@material-ui/core/InputLabel';
import Select from "@material-ui/core/Select";
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';

const Review = ({ }) => {

    const [movie, setMovie] = React.useState('');
    const [reviewTitle, setReviewTitle] = React.useState('');
    const [reviewBody, setReviewBody] = React.useState('');
    const [reviewRating, setReviewRating] = React.useState('1');


    const handleChangeMovie = (event) => {
        setMovie(event.target.value);
    };

    const handleChangeTitle = (event) => {
        setReviewTitle(event.target.value);
    };

    const handleChangeBody = (event) => {
        setReviewBody(event.target.value);
    };

    const handleChangeReviewRating = (event) => {
        setReviewRating(event.target.value);
    };


    return (
        <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
        >
            <Typography
                variant="h3"
                gutterBottom
                component="div">
                Rotten Potatoes
            </Typography>

            <ReviewTitle
            ></ReviewTitle>
            <ReviewBody></ReviewBody>
            <ReviewRating>
            </ReviewRating>

        </Grid>
    )
}

const ReviewTitle = ({ }) => {

    return (
        <FormControl className={"Movie-Title-Input"}>
            <InputLabel id="controlled-open-select-label">Movie:</InputLabel>
            <Select
                labelId="controlled-open-select-label"
                id="movie-title"
            >

                <MenuItem value={"Morbius"}>Morbius</MenuItem>
                <MenuItem value={"The Batman"}>The Batman</MenuItem>
                <MenuItem value={"Doctor Strange in the Multiverse of Madness"}>Doctor Strange in the Multiverse of Madness</MenuItem>
                <MenuItem value={"Sonic the Hedgehog 2"}>Sonic the Hedgehog 2</MenuItem>
                <MenuItem value={"Uncharted"}>Uncharted</MenuItem>
            </Select>
        </FormControl>
    )
}

const ReviewBody = ({ }) => {
    return (
        <TextField
            id="outlined-textarea"
            label="Review:"
            multiline
            variant="outlined"
        ></TextField>
    )
}

const ReviewRating = ({ }) => {
    return (
        <FormControl component="fieldset">
            <FormLabel component="legend">Rating (1 - Low | 5 - High):</FormLabel>
            <RadioGroup
                row aria-label="position"
                name="position"
                defaultValue="top"
            >

                <FormControlLabel
                    value="1"
                    control={<Radio color="primary" />}
                    label="1"
                    labelPlacement="bottom"
                />
                <FormControlLabel
                    value="2"
                    control={<Radio color="primary" />}
                    label="2"
                    labelPlacement="bottom"
                />
                <FormControlLabel
                    value="3"
                    control={<Radio color="primary" />}
                    label="3"
                    labelPlacement="bottom"
                />
                <FormControlLabel
                    value="4"
                    control={<Radio color="primary" />}
                    label="4"
                    labelPlacement="bottom"
                />
                <FormControlLabel
                    value="5"
                    control={<Radio color="primary" />}
                    label="5"
                    labelPlacement="bottom"
                />
            </RadioGroup>
        </FormControl>
    )
}

function App() {
    return (
        <Review>

        </Review>
    )
}

export default App;