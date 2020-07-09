import React from "react";
import { Container } from "@material-ui/core";
import { HeroCard } from "../components/HeroCard";
//import { MuiThemeProvider } from '@material-ui/core/styles';
//import theme from "../../../theme"

function Home() {
        return (
            <>
                {/* <MuiThemeProvider theme={theme}> */}
                        <HeroCard>
                        </HeroCard>
                {/* </MuiThemeProvider> */}
            </>
        )
    };

export default Home;
