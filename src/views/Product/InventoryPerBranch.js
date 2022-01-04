import React from "react";

import GridItem from "components/Grid/GridItem";
import TextField from '@material-ui/core/TextField';
import GridContainer from "components/Grid/GridContainer";
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import TabPanel from '@material-ui/lab/TabPanel'
import TabContext from '@material-ui/lab/TabContext'
import TabList from '@material-ui/lab/TabList'


export default function InventoryPerBranch(props) {

    const [value, setValue] = React.useState(props.branch[0].name);    

    const [renderFirsTime, setRenderFirstTime] = React.useState(false);

    const [inventories, setInventories] = React.useState([]);

    

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const newInventorie = (comb, branch, index,branchId) => {
        if (!renderFirsTime) {
            inventories.push({
                quantity: 0,
                attr: comb,
                branch: branch,
                branchId:branchId
            })
            if (index === props.combinations.length*props.branch.length - 1) {
                setRenderFirstTime(true)
            }
            props.callBack(inventories)
        }
    }

    const handleChangeInventory = (event) => {
       const index = event.target.name;
       const localInventories = [...inventories]
       localInventories[index].quantity = Number(event.target.value)
       console.log("inventories changing",localInventories)
       setInventories(localInventories)
       props.callBack(localInventories)
    };

    const tabsComponent = (branchName,branchIndex,branchId) => {
        let finalIndex=props.combinations.length*branchIndex
        return <><h4>Ingresa el inventario para cada combinación</h4>
            {props.combinations.map((comb, index) => (
                <GridContainer>
                    {newInventorie(comb, branchName, finalIndex+index,branchId)}
                    <GridItem xs={6} sm={6} md={6} style={{ "textAlign": "left", "paddingTop": "10px" }}>
                        <label style={{ "fontSize": "1em" }}>{comb} </label>
                    </GridItem>
                    <GridItem xs={6} sm={6} md={6}>
                        <TextField onChange={handleChangeInventory} value={inventories[finalIndex+index].quantity} inputProps={{ name: finalIndex+index, attr: comb, id: `${comb}-${branchName}`, min: 0 }} type="number" style={{ width: "98%", backgroundColor: "white", "paddingTop": "10px", marginTop: "10%" }} id="outlined-basic" label="Inventario" variant="outlined" required />
                    </GridItem>
                </GridContainer>
            ))}</>
    }

    return (

        <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <TabList
                    variant="scrollable"
                    scrollbuttons
                    allowScrollbuttonsmobile
                    value={value}
                    onChange={handleChange}
                    aria-label="Sucursales"
                    sx={{ borderRight: 1, borderColor: 'divider' }}
                >

                    {props.branch.map((row) => (
                        <Tab label={row.name} value={row.name} />
                    ))}
                </TabList>
            </Box>

            {props.branch.map((row,index) => (
                <TabPanel value={row.name} index={row.name}>{tabsComponent(row.name,index,row.id)}</TabPanel>
            ))}


        </TabContext>

    )
}