import * as React from 'react';
import Grid from "@material-ui/core/Grid";
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
import Box from "@material-ui/core/Box";
import Button from '@material-ui/core/Button';
import FormHelperText from '@material-ui/core/FormHelperText';

const serverURL = "http://ec2-18-188-101-79.us-east-2.compute.amazonaws.com:3094"

const Review = () => {

    // List State
    const [reviewsList, setReviews] = React.useState([]);

    // Movies State
    const [movies, setMovies] = React.useState([]);

    // Review States
    const [selectedMovie, setSelectedMovie] = React.useState('');
    const [enteredTitle, setEnteredTitle] = React.useState('');
    const [enteredReview, setEnteredReview] = React.useState('');
    const [selectedRating, setSelectedRating] = React.useState('');
    const [showReceivedMessage, setShowReceivedMessage] = React.useState('');

    // Error States
    const [movieError, setMovieError] = React.useState(false);
    const [titleError, setTitleError] = React.useState(false);
    const [bodyError, setBodyError] = React.useState(false);
    const [ratingError, setRatingError] = React.useState(false);

    // List State Handling
    const handleAddReviews = () => {
        const newReviewsList = reviewsList.concat({
            selectedMovie: selectedMovie,
            enteredTitle: enteredTitle,
            enteredReview: enteredReview,
            selectedRating: selectedRating,
        })

        setReviews(newReviewsList);

        setSelectedMovie('');
        setEnteredTitle('');
        setEnteredReview('');
        setSelectedRating('');
    }

    // Review State Handling
    const handleChangeMovie = (event) => {
        setSelectedMovie(event.target.value);
        setMovieError(event.target.value === '');
        setShowReceivedMessage(false);
    };

    const handleChangeTitle = (event) => {
        setEnteredTitle(event.target.value);
        setTitleError(event.target.value === '');
        setShowReceivedMessage(false);
    };

    const handleChangeBody = (event) => {
        setEnteredReview(event.target.value);
        setBodyError(event.target.value === '');
        setShowReceivedMessage(false);
    };

    const handleChangeReviewRating = (event) => {
        setSelectedRating(event.target.value);
        setRatingError(event.target.value === '');
        setShowReceivedMessage(false);
    };

    // Handle Validation
    const handleValidation = () => {
        setMovieError(selectedMovie === '');
        setTitleError(enteredTitle === '');
        setBodyError(enteredReview === '');
        setRatingError(selectedRating === '');

        if (!(selectedMovie === '') && !(enteredTitle === '') && !(enteredReview === '') && !(selectedRating === '')) {
            setShowReceivedMessage(true);
            handleAddReviews();
        } else {
            setShowReceivedMessage(false); // removes submission message
        }
    }

    const callApiGetMovies = async () => {
        const url = serverURL + "/api/getMovies";
        console.log(url);

        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            }
        })

        const body = await response.json();
        if (response.status !== 200) throw Error(body.message);
        console.log("Found movies: ", body);
        return body;
    }

    const handleGetMovies = () => {
        callApiGetMovies()
            .then(res => {
                console.log("callApiGetMovies returned: ", res)
                var parsed = JSON.parse(res.express);
                console.log("callApiGetMovies parsed: ", parsed);
                setMovies(parsed);
            })
    }

    React.useEffect(() => {
        handleGetMovies();
      }, [movies]);

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

            <MovieSelection
                selectedMovie={selectedMovie}
                movieError={movieError}
                handleChangeMovie={handleChangeMovie}
            ></MovieSelection>

            <ReviewTitle
                enteredTitle={enteredTitle}
                titleError={titleError}
                handleChangeTitle={handleChangeTitle}
            ></ReviewTitle>

            <ReviewBody
                enteredReview={enteredReview}
                bodyError={bodyError}
                handleChangeBody={handleChangeBody}
            ></ReviewBody>

            <ReviewRating
                selectedRating={selectedRating}
                ratingError={ratingError}
                handleChangeReviewRating={handleChangeReviewRating}
            ></ReviewRating>

            <Button
                variant="contained"
                color="primary"
                onClick={() => { handleValidation() }}>Submit</Button>

            {showReceivedMessage && <p style={{ color: 'green' }}>Your review has been received.</p>}
            {!showReceivedMessage && <Box sx={{ m: 3 }} />}

            <Typography
                variant="h4"
                gutterBottom
                component="div">
                Reviews
            </Typography>

            <ul>
                {reviewsList.map(function (review) {
                    return (
                        <li>
                            <span> {"Movie: " + review.selectedMovie}</span>
                            <span> {" | Review Title: " + review.enteredTitle}</span>
                            <span> {" | Review Body: " + review.enteredReview + "\n"}</span>
                            <span>{" | Rating: " + review.selectedRating}</span>
                        </li>
                    )
                })}
            </ul>

        </Grid>
    )
}

const MovieSelection = (props) => {
    return (
        <FormControl className={"Movie-Title-Input"}>
            <InputLabel id="controlled-open-select-label">Movie:</InputLabel>
            <Select
                id="review-movie"
                value={props.selectedMovie}
                onChange={props.handleChangeMovie}
            >

                <MenuItem value={"Morbius"}>Morbius</MenuItem>
                <MenuItem value={"Batman"}>The Batman</MenuItem>
                <MenuItem value={"Doctor Strange in the Multiverse of Madness"}>Doctor Strange in the Multiverse of Madness</MenuItem>
                <MenuItem value={"Sonic the Hedgehog 2"}>Sonic the Hedgehog 2</MenuItem>
                <MenuItem value={"Uncharted"}>Uncharted</MenuItem>
            </Select>
            <FormHelperText>Select a movie.</FormHelperText>
            {props.movieError && <p style={{ color: 'red' }}>Please select a movie.</p>}
            {!props.movieError && <Box sx={{ m: 3 }} />}
        </FormControl>
    )
}

const ReviewTitle = (props) => {
    return (
        <div>
            <TextField
                value={props.enteredTitle}
                onChange={props.handleChangeTitle}
                id="review-title"
                label="Review Title:"
                variant="outlined"
            ></TextField>
            <FormHelperText>Enter a title.</FormHelperText>
            {props.titleError && <p style={{ color: 'red' }}>Please enter your review title.</p>}
            {!props.titleError && <Box sx={{ m: 3 }} />}
        </div>
    )
}

const ReviewBody = (props) => {
    return (
        <div>
            <TextField
                value={props.enteredReview}
                onChange={props.handleChangeBody}
                inputProps={{ maxLength: 200 }}
                id="review-body"
                label="Review:"
                multiline
                rows={4}
                variant="outlined"
            ></TextField>
            <FormHelperText>Enter a review.</FormHelperText>
            {props.bodyError && <p style={{ color: 'red' }}>Please enter your review.</p>}
            {!props.bodyError && <Box sx={{ m: 3 }} />}
        </div>
    )
}

const ReviewRating = (props) => {
    return (
        <FormControl component="fieldset">
            <FormLabel component="legend">Rating (1 - Low | 5 - High):</FormLabel>
            <RadioGroup
                value={props.selectedRating}
                onChange={props.handleChangeReviewRating}
                id="review-rating"
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
            <FormHelperText>Select a rating.</FormHelperText>
            {props.ratingError && <p style={{ color: 'red' }}>Please select the rating.</p>}
            {!props.ratingError && <Box sx={{ m: 3 }} />}
        </FormControl>
    )
}

export default Review;