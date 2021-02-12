import React, {useEffect, useState} from 'react';
import { 
    ThemeProvider,
    makeStyles 
} from '@material-ui/core/styles';
import { 
    Container,
    Typography, 
} from '@material-ui/core';
import clsx from 'clsx';
import Dialog from "@material-ui/core/Dialog";
import CircularProgress from '@material-ui/core/CircularProgress';
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import theme from '../styles/theme';
import NavBar from '../components/NavBar';
import ScoringForm from '../components/ScoringForm';
import Results from '../components/Results';
//import getCsrfToken from '../components/csrftoken';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    pageHeader: {
        paddingTop: '50px',
    },
    root: {
        display: 'flex',
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
    },
}));


export default function Home() {
    const config = require("../templates.json");

    var defaultScoresDict = {
        "c_1_1": "0",
        "c_1_2": "0",
        "c_1_3": "0",
        "c_2_1": "0",
        "c_2_2": "0",
        "c_2_3": "0",
        "c_2_4": "0",
        "c_2_5": "0",
        "c_3_1": "0",
        "c_4_1": "0",
        "c_4_2": "0",
        "c_5_1": "0",
        "c_5_2": "0",
        "f_0_1": "0",
        "f_0_2": "0",
        "f_1_1": "0",
        "f_1_2": "0",
        "f_1_3": "0",
        "f_1_4": "0",
        "f_1_5": "0",
        "f_2_1": "0",
        "f_2_2": "0",
        "f_3_1": "0",
        "f_4_1": "0",
        "c_1_1_comments": "",
        "c_1_2_comments": "",
        "c_1_3_comments": "",
        "c_2_1_comments": "",
        "c_2_2_comments": "",
        "c_2_3_comments": "",
        "c_2_4_comments": "",
        "c_2_5_comments": "",
        "c_3_1_comments": "",
        "c_4_1_comments": "",
        "c_4_2_comments": "",
        "c_5_1_comments": "",
        "c_5_2_comments": "",
        "f_0_1_comments": "",
        "f_0_2_comments": "",
        "f_1_1_comments": "",
        "f_1_2_comments": "",
        "f_1_3_comments": "",
        "f_1_4_comments": "",
        "f_1_5_comments": "",
        "f_2_1_comments": "",
        "f_2_2_comments": "",
        "f_3_1_comments": "",
        "f_4_1_comments": "",
        "calc_scores": false
    }
    var defaultResultsDict = {
        "clinical": "0",
        "functional": "0",
        "rve": "0",
        "standard_scores": {},
        "variant_info": {},
    }
    var defaultQueryDict = {
        "patient_id": "",
        "variant_id": "",
        "target_gene": "",
        "ref_genome": "",
        "chro": "",
        "pos": "",
        "alt": "",
        "gnomad_coord": "",
        "c_1_3": "unknown",
        "c_3_1": "unknown",
        "c_3_1_additional": "trio",
        "c_4_1": "unknown",
        "c_2_1": "unknown",
        "c_2_2": "unknown",
        "c_2_4": "unknown",
        "func_analysis": "no",
        "c_4_2": "unknown",
        "c_5_1": "unknown",
        "c_5_2": "unknown",
        "f_1_1": "unknown",
        "f_1_5": "unknown",
        "f_2_1": "unknown",
        "f_2_2": "unknown",
        "f_3_1": "unknown",
        "f_4_1": "unknown",
        "new_c": "unknown",
        "calc_scores": false
    }
    var defaultInfo = {
        "patient_id": "",
        "variant_id": "",
        "variant_name": "", 
        "variant_pos": "",
        "variant_description": "",
        "ref_genome": "",
        "target_gene": ""
    }
    const [query, setQuery] = useState(defaultQueryDict);
    const [initialScores, setInitialScores] = useState(defaultScoresDict);
    const [modifiedScores, setModifiedScores] = useState(defaultScoresDict);
    const [additionalInfo, setAdditionalInfo] = useState(defaultScoresDict);
    const [variantInfo, setVariantInfo] = useState(defaultInfo);
    //const [finalScores, setFinalScores] = useState(defaultScoresDict);
    const [finalResults, setFinalResults] = useState(defaultResultsDict);
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState("unfilled");
    const classes = useStyles();

    useEffect(() => {
        const fetchInitialData = async () => {
            setLoading(true)
            const response = await fetch(config.backend_url + '/initial_scores', {
                method: 'POST',
                body: JSON.stringify(query),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    //'X-CSRFToken': await getCsrfToken(),
                },
                //credentials: 'include'
            });
            const json = await response.json();
            setInitialScores(json["scores"]);
            setModifiedScores(json["scores"]);
            setAdditionalInfo(json["additional_info"]);
            setVariantInfo(json["variant_info"]);
            setLoading(false)
            console.log(json);
        }
        //console.log("1")
        if (query["calc_scores"] === true){
            fetchInitialData();
            setQuery({...query, "calc_scores": false});
        }
        
    }, [query]);

    useEffect(() => {
        const fetchFinalData = async () => {
            const response = await fetch(config.backend_url + '/calc_scores', {
                method: 'POST',
                body: JSON.stringify(modifiedScores),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    //'X-CSRFToken': await getCsrfToken(),
                },
                //credentials: 'include'
            });
            const json = await response.json();
            setFinalResults(json);
            setStatus("filled");
        }
        if (modifiedScores["calc_scores"] === true) {
            fetchFinalData();
            setModifiedScores({...modifiedScores, "calc_scores": false});
        }


    }, [modifiedScores]);

    return (
        <React.Fragment>
            <div className={classes.root}>
                <ThemeProvider theme={theme}>
                    <NavBar 
                        open={open} 
                        setOpen={setOpen}
                    />
                    { /*  TODO: Insert logo image here */ }
                    <main
                        className={clsx(classes.content, {
                        [classes.contentShift]: open,
                        })}
                    >
                        <div className={classes.drawerHeader} />
                        <Container maxWidth="lg">
                            <Typography className={classes.pageHeader} variant="h2" align="center" gutterBottom>
                                Regulatory Variant Scoring System
                            </Typography>
                            <Typography  variant="body1"  align="center" gutterBottom>
                                This bioinformatic tool was developed to improve clinical 
                                interpretation of suspected regulatory genetic variants. While 
                                tools already exists for classification of exonic variants based 
                                on the ACMG / AMP 2015 guidelines (ex: 
                                <a href="http://wintervar.wglab.org">InterVar-Genetic variants Interpretation by ACMG/AMP 2015 guideline</a>
                                ), this tool focuses on the interpretation of suspected regulatory 
                                variants, based on the classification developed by Van der Lee R, 
                                Correard S and Wasserman WW in “Deregulated Regulators: Disease-
                                Causing cis Variants in Transcription Factor Genes” (Trends in 
                                Genetics, 2020).
                                <br/><br/>
                                For more information, please refer to the <a href="/about">About page</a>
                            </Typography>
                        </Container>
                        <Container maxWidth="lg">
                            <Dialog 
                                aria-labelledby="LoadingBarDialog" 
                                disableBackdropClick={true} 
                                disableEscapeKeyDown={true} 
                                open={loading}
                                style={{textAlign: "center"}}
                            >
                                <DialogTitle id="LoadingBarTitle">Loading...</DialogTitle>
                                <DialogContent>
                                    <CircularProgress/>
                                </DialogContent>
                            </Dialog>
                            { status === "unfilled" ? 
                            <ScoringForm 
                                setQuery={setQuery} 
                                setModifiedScores={setModifiedScores}
                                query={query}
                                defaultQueryDict={defaultQueryDict}
                                modifiedScores={modifiedScores}
                                initialScores={initialScores}
                                additionalInfo={additionalInfo}
                                variantInfo={variantInfo}
                            />
                            : <Results 
                                finalResults={finalResults}
                                modifiedScores={modifiedScores}
                                additionalInfo={additionalInfo}
                                variantInfo={variantInfo}
                            />}
                        </Container>
                    </main>
                </ThemeProvider>
            </div>
        </React.Fragment>
    )
}