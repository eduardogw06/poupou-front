import Dialog from "@mui/material/Dialog";
import styled from "styled-components";

// const CustomDialog = styled(Dialog)`



const CustomDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiPaper-root': {
        background: `${theme === 'dark' ? '#1A1A40' : '#FFF'} !important`
    }

}));


export {
    CustomDialog
};
