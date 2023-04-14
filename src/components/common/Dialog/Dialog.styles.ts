import Dialog from "@mui/material/Dialog";
import styled from "styled-components";

const CustomDialog = styled(Dialog)(({ theme }) => ({
    '& .css-tlc64q-MuiPaper-root-MuiDialog-paper': {
        background: `${theme === 'dark' ? '#1A1A40' : '#FFF'} !important`
    }

}));

export {
    CustomDialog
};
