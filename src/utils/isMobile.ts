import { useMediaQuery } from "@mui/material";
import { useTheme } from "styled-components";
import { DefaultTheme } from "../types/DefaultTheme";

const isMobile = (): boolean => {
    const theme = useTheme() as DefaultTheme;
    const { md } = theme.media;
    return !useMediaQuery(md);
}

export { isMobile };