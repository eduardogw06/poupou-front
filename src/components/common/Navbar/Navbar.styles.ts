import { darken, Switch } from "@mui/material";
import { lighten } from "polished";
import styled from "styled-components";


const Container = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    height: 70px;
    background-color: ${(props: any) => props.theme.colors.secondary};

    padding: 20px; ;
`;

const Notifications = styled.div`

`

const ProfilePhoto = styled.a`
    background: ${props => props.theme.colors.tertiary};
    border: 2px solid ${props => props.theme.colors.tertiary};
    border-radius: 200px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 48px;
    height: 48px;

    > * {
        border-radius: 30px;
    }

    @media (${(props: any): string => props.theme.media.md}) {
        margin-right: ${(props: any): string => props.theme.sizes.medium2};
    }
`

const DropDown = styled.div`
    width: calc(100vw - 20px);
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    position: absolute;
    z-index: 1000;
`

const DropDownContent = styled.ol`
    background: ${props => props.theme.colors.secondary};
    width: 200px;
    height: 40vh;
    list-style: none;

    li:nth-child(3) { 
        padding-left: 0px;
        cursor: default;
    }

    @media (${(props: any): string => props.theme.media.md}) {
        height: 50vh;
    }
`

const DropDownContentItem = styled.li`
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 20px;
    cursor: pointer;

    font-family: 'Circular Std';
    font-style: normal;
    font-weight: 700;
    font-size: 16px;
    line-height: 25px;
    color: ${props => props.theme.colors.text};

    > * { 
        > * {
            margin-right: 16px;
        }
        
    }  

    &:hover {
        background: ${props => lighten(0.05, props.theme.colors.secondary)};
    }
`

const MaterialUISwitch = styled(Switch)(({ theme }) => ({
    padding: 12,
    '& .MuiSwitch-switchBase': {
        margin: 4,
        padding: 0,
        transform: 'translateX(6px)',
        '&.Mui-checked': {
            color: '#fff',
            transform: 'translateX(22px)',
            '& .MuiSwitch-thumb:before': {
                backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
                    '#fff',
                )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
            },
            '& + .MuiSwitch-track': {
                opacity: 1,
                backgroundColor: darken('#6200EE', 0.3),
            },
        },
    },
    '& .MuiSwitch-thumb': {
        backgroundColor: '#6200EE',
        width: 32,
        height: 32,
        '&:before': {
            content: "''",
            position: 'absolute',
            width: '100%',
            height: '100%',
            left: 0,
            top: 0,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
                '#fff',
            )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
        },
    },
    '& .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: darken('#6200EE', 0.3),
        borderRadius: 20 / 2,
    },
}));

export {
    Container,
    Notifications,
    ProfilePhoto,
    DropDown,
    DropDownContent,
    DropDownContentItem,
    MaterialUISwitch,
};
