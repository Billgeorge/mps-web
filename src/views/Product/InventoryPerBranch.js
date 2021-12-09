import React from "react";

import GridItem from "components/Grid/GridItem";
import TextField from '@material-ui/core/TextField';
import styles from "assets/jss/material-kit-react/views/CreateProduct";
import { makeStyles } from "@material-ui/core/styles";
import GridContainer from "components/Grid/GridContainer";
import TabsUnstyled from '@mui/base/TabsUnstyled';
import { styled } from '@mui/system';
import TabsListUnstyled from '@mui/base/TabsListUnstyled';
import TabPanelUnstyled from '@mui/base/TabPanelUnstyled';
import { buttonUnstyledClasses } from '@mui/base/ButtonUnstyled';
import TabUnstyled, { tabUnstyledClasses } from '@mui/base/TabUnstyled';

const useStyles = makeStyles(styles);
export default function InventoryPerBranch(props) {

    const classes = useStyles();

    const primary = {
        50: '#F0F7FF',
        100: '#C2E0FF',
        200: '#80BFFF',
        300: '#66B2FF',
        400: '#3399FF',
        500: '#007FFF',
        600: '#0072E5',
        700: '#0059B2',
        800: '#004C99',
        900: '#003A75',
      };
      
      const Tab = styled(TabUnstyled)`
        color: ${primary[100]};
        cursor: pointer;
        font-size: 1rem;
        background: ${primary[500]};
        padding: 15px 20px;
        border: none;
        display: flex;
      
        &.Mui-selected {
          color: #fff;
          font-weight: bold;
        }
      
        &:hover {
          color: #fff;
        }
      
        &.${buttonUnstyledClasses.focusVisible} {
          color: #fff;
          outline: none;
          background-color: ${primary[600]};
          border-bottom: 2px solid ${primary[600]};
        }
      
        &.${tabUnstyledClasses.selected} {
          border-bottom: 2px solid #fff;
        }
      
        &.${buttonUnstyledClasses.disabled} {
          opacity: 0.5;
          cursor: not-allowed;
          box-shadow: 0 0 0 0 rgba(0, 127, 255, 0);
        }
      `;
      

    const [value, setValue] = React.useState(props.branch[0].name);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const TabPanel = styled(TabPanelUnstyled)`
  width: 100%;
`;

    const TabsList = styled(TabsListUnstyled)`
  background-color: ${primary[500]};
  border-radius: 8px;
  box-shadow: 0 20px 25px rgba(0, 0, 0, 0.05), 0 10px 10px rgba(0, 0, 0, 0.02);
  padding: 0 10px 0 10px;
  margin-bottom: 10px;
  display: flex;
  align-content: space-between;
`;

    const tabsComponent =
        <><h4>Ingresa el inventario para cada combinación</h4>
            {props.combinations.map((comb) => (
                <GridContainer>
                    <GridItem xs={6} sm={6} md={6} style={{ "textAlign": "left", "paddingTop": "10px" }}>
                        <label style={{ "font-size": "1.5em" }}>{comb} </label>
                    </GridItem>
                    <GridItem xs={6} sm={6} md={6}>
                        <TextField inputProps={{ min: 0 }} type="number" style={{ width: "98%", backgroundColor: "white", "paddingTop": "10px", marginTop: "10%" }} id="outlined-basic" label="Inventario" variant="outlined" required />
                    </GridItem>
                </GridContainer>
            ))}</>



    React.useEffect(() => {
        console.log("branches", props.branch)
        setValue(props.branch[0].name)
    }, []);
    return (
        <TabsUnstyled defaultValue={props.branch[0].name}>

            {props.branch.map((row) => (
                <TabsList><Tab>{row.name}</Tab> </TabsList>
            ))}
            {props.branch.map((row) => (
                <TabPanel value={row.name}>{tabsComponent}</TabPanel>
            ))}

        </TabsUnstyled>
    )
}