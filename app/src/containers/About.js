import React, {useState} from 'react';
import { 
    ThemeProvider,
    makeStyles 
} from '@material-ui/core/styles';
import { 
    Card,
    CardContent,
    Container,
    Divider,
    Grid,
    Link,
    Typography, 
} from '@material-ui/core';
import clsx from 'clsx';
import theme from '../styles/theme';
import NavBar from '../components/NavBar';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    pageHeader: {
        paddingTop: '50px',
    },
    root: {
        display: 'flex',
        width: '100%',
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    },
    card: {
        display: 'flex',
        padding: "2%",
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
    grid: {
        padding: "0px",
        marginRight: "auto",
        marginLeft: "auto"
    },
}));


export default function About() {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
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
                            <Grid container direction="row" justify="center" alignItems="center" alignContent="flex-end" spacing={3}>
                                <Grid container spacing={3}>
                                    <Grid item xs={12}>
                                        <Card className={classes.card}>
                                            <CardContent>
                                                <Typography variant="h4">
                                                    About RevUP
                                                </Typography>
                                                <Divider />
                                                <br></br>
                                                <Typography variant="body1" color="textSecondary" paragraph>
                                                    RevUP was developed to improve clinical interpretation of suspected 
                                                    regulatory genetic variants. While tools already exists for 
                                                    classification of exonic variants based on the ACMG / AMP 2015 guidelines, 
                                                    RevUP focuses on the interpretation of suspected regulatory variants.
                                                </Typography>
                                                <Typography  variant="body1"  color="textSecondary" paragraph>
                                                    In Van der Lee et al., 2020, a semiquantitative classification scheme 
                                                    was developed to calculate the Regulatory Variant Evidence score (RVE-score), 
                                                    which summarizes the accumulated evidence for a causative role of a regulatory 
                                                    variant in a rare disease. The RVE-score is based on the 22 criteria and RevUP 
                                                    was developed to help the user calculate the score by combining user's input 
                                                    and information available in public databases.
                                                </Typography>
                                                <Typography  variant="body1"  color="textSecondary">
                                                    For the list of external databases that RevUP is using and the scoring 
                                                    system associated, refer to Table 1 on our <Link href="/faq" color="secondary">FAQ page</Link>.
                                                </Typography>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Card className={classes.card}>
                                            <CardContent>
                                                <Typography variant="h4">
                                                    References
                                                </Typography>
                                                <Divider />
                                                <br></br>
                                                <Typography variant="body1" color="textSecondary" paragraph>
                                                    A manuscript describing RevUP is under review.  In the meantime, if you used this 
                                                    website to score a variant, please cite:
                                                </Typography>
                                                <Typography  variant="body1"  color="textSecondary">
                                                    van der Lee R, Correard S, Wasserman WW. Deregulated Regulators: Disease-Causing 
                                                    cis Variants in Transcription Factor Genes. Trends Genet. 2020 Jul;36(7):523-539. 
                                                    doi: 10.1016/j.tig.2020.04.006. Epub 2020 May 22. PMID: 32451166.
                                                    {/* TODO: Add link to webpage ref when published */}
                                                </Typography>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Container>
                    </main>
                </ThemeProvider>
            </div>
        </React.Fragment>
    )
}