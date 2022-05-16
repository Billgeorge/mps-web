import React from "react";
import Popover from '@mui/material/Popover';
import Button from '@mui/material/Button';
import GridItem from "components/Grid/GridItem";
import ResponsiveDrawe from "components/LeftMenu/ResponsiveDrawer.js"
import styles from "assets/jss/material-kit-react/views/DashBoard.js";
import { makeStyles } from '@material-ui/core/styles';
import { consumeServiceGet } from 'service/ConsumeService'
import { CORE_BASEURL } from 'constant/index'
import Alert from '@material-ui/lab/Alert';



const useStyles = makeStyles(styles);
export default function ReferralsTree(props) {

    const [dinamicAnchor, setDinamicAnchor] = React.useState({})
    const [dinamicOpen, setdinamicOpen] = React.useState({})
    const [errorMessage, setErrorMessage] = React.useState({});
    const [referrals, setReferrals] = React.useState({
        referrals:[]
    });

/*
    const referrals = [
        {
            name: "Jorge Leonardo Espinosa",
            referrals: [
                {
                    name: "Maria Gutierrez",
                    referrals: []
                },
                {
                    name: "Mathias Alonso",
                    referrals: [{
                        name: "Isaac Espinosa 1",
                        referrals: [{
                            name: "Isaac Espinosa 1",
                            referrals: []
                        },
                        {
                            name: "Isaac Espinosa",
                            referrals: []
                        },
                        {
                            name: "Isaac Espinosa",
                            referrals: []
                        },
                        {
                            name: "Isaac Espinosa",
                            referrals: []
                        },
                        {
                            name: "Isaac Espinosa",
                            referrals: []
                        }]
                    },
                    {
                        name: "Isaac Espinosa",
                        referrals: []
                    },
                    {
                        name: "Isaac Espinosa",
                        referrals: []
                    },
                    {
                        name: "Isaac Espinosa",
                        referrals: []
                    },
                    {
                        name: "Isaac Espinosa",
                        referrals: []
                    }]
                }
            ]
        },
        {
            name: "Jorge Leonardo Espinosa",
            referrals: [
                {
                    name: "Maria Gutierrez",
                    referrals: []
                },
                {
                    name: "Mathias Alonso",
                    referrals: [{
                        name: "Isaac Espinosa",
                        referrals: []
                    },
                    {
                        name: "Isaac Espinosa",
                        referrals: []
                    },
                    {
                        name: "Isaac Espinosa",
                        referrals: []
                    },
                    {
                        name: "Isaac Espinosa",
                        referrals: []
                    },
                    {
                        name: "Isaac Espinosa",
                        referrals: []
                    }]
                }
            ]
        }
    ]
    */

    React.useEffect(() => { console.log("use efect execute"); fetchingReferralsForUser() }, []);
    React.useEffect(() => {
        console.log("use efect execute per render");
        setTimeout(function () {
            attachHandleClick()
        }, 500);

    });
    React.useEffect(() => { generateDinamicFunctions() }, [dinamicAnchor]);

    const fetchingReferralsForUser = () => {
        let url = `${CORE_BASEURL}/referral`
        consumeServiceGet(callBack, generatingReferrals, url)
    }


    const callBack = (error) => {
        if (error != null && typeof error === 'object') {
            setErrorMessage(error)
        } else if (error != null) {
            setErrorMessage({ 'Error': error })
        }
        else {
            setErrorMessage({ 'Error': 'Ha ocurrido un error inesperado por favor contactar al administrador' })
        }        
    }
    const generatingReferrals = (referrals) => {
        const accumAnchorIdex = []
        setReferrals(referrals)
        referrals.referrals.forEach(
            function (referral, index, array) {
                accumAnchorIdex.push(index)
                if (referral.referrals.length === 0) {
                    generateDinamicAnchors(accumAnchorIdex)
                }
                referral.referrals.forEach(
                    function (referral2, index2, array2) {
                        accumAnchorIdex.push(`${index}${index2}`)
                        if (referral2.referrals.length === 0) {
                            generateDinamicAnchors(accumAnchorIdex)
                        }
                        referral2.referrals.forEach(
                            function (referral3, index3, array3) {
                                accumAnchorIdex.push(`${index}${index2}${index3}`)
                                if (referral3.referrals.length === 0) {
                                    generateDinamicAnchors(accumAnchorIdex)
                                }
                                referral3.referrals.forEach(
                                    function (referral4, index4, array4) {
                                        accumAnchorIdex.push(`${index}${index2}${index3}${index4}`)
                                        generateDinamicAnchors(accumAnchorIdex)
                                    }
                                )
                            }
                        )
                    }
                )
            }
        )
    }

    const generateDinamicAnchors = (acc) => {
        console.log("anchor exec index", acc)
        let jsonAcc = {}
        acc.forEach(
            function (anchorIndex) {
                jsonAcc = {
                    ...jsonAcc,
                    [anchorIndex]: null
                }
            }
        )
        console.log("anchor json", jsonAcc)
        setDinamicAnchor(
            {
                ...dinamicAnchor,
                ...jsonAcc
            }
        )
    }
    const generateDinamicFunctions = () => {
        let openAcc = attachHandleClick()
        setdinamicOpen({ ...dinamicOpen, ...openAcc })
    }

    const handleCloseDef = (index) => {
        setDinamicAnchor(
            {
                ...dinamicAnchor,
                [index]: null
            }
        )
    }
    const attachHandleClick = () => {
        let openAcc = {}
        for (var clave in dinamicAnchor) {
            if (dinamicAnchor.hasOwnProperty(clave)) {
                const handleClick = (event) => {
                    let index = event.target.id.replace('button', '')
                    let lastNode = referrals.referrals
                    for (var i = 0, len = index.length; i < len; i += 1) {
                        lastNode = lastNode[index.charAt(i)].referrals
                    }

                    if (dinamicAnchor.hasOwnProperty(index) && lastNode && lastNode.length > 0) {

                        setDinamicAnchor(
                            {
                                ...dinamicAnchor,
                                [index]: event.currentTarget
                            }
                        )
                    }
                }
                let lastNode = referrals.referrals
                for (var i = 0, len = clave.length; i < len; i += 1) {
                    lastNode = lastNode[clave.charAt(i)].referrals
                }
                if (document.getElementById(`button${clave}`) && lastNode && lastNode.length > 0) {
                    console.log("attaching clic", clave)
                    document.getElementById(`button${clave}`).onclick = handleClick
                }
                openAcc = {
                    ...openAcc,
                    [`open${clave}`]: Boolean(dinamicAnchor[[`${clave}`]])
                }
            }
        }
        return openAcc
    }
    const classes = useStyles();
    return (
        <div>
            <ResponsiveDrawe />
            <div className={classes.container}>
                <span className={classes.valueText}>Total referidos:{referrals.totalReferrals}</span><br />
                {Object.keys(errorMessage).map((keyName, i) => (
                    <Alert severity="error">{keyName} : {errorMessage[keyName]}</Alert>
                ))}
                {
                    referrals.referrals.map(
                        function (referral1, index1, array1) {
                            return <>
                                <Button id={`button${index1}`} variant="contained">
                                    {referral1.name}
                                </Button>

                                <Popover
                                    id={dinamicOpen[`open${index1}`] ? 'simple-popover' : undefined}
                                    open={dinamicOpen[`open${index1}`]}
                                    anchorEl={dinamicAnchor[`${index1}`]}
                                    onClose={() => handleCloseDef(index1)}
                                >
                                    {referral1.referrals.map(
                                        function (referral2, index2, array2) {
                                            return <GridItem xs={12} sm={12} md={12}>

                                                <Button variant="contained" color="secondary" id={`button${index1}${index2}`}>
                                                    {referral2.name}
                                                </Button>

                                                <Popover
                                                    id={dinamicOpen[`open${index1}${index2}`] ? 'simple-popover' : undefined}
                                                    open={dinamicOpen[`open${index1}${index2}`]}
                                                    anchorEl={dinamicAnchor[`anchor${index1}${index2}`]}
                                                    onClose={() => handleCloseDef(`${index1}${index2}`)}
                                                    style={{ left: '27%', top: '22%' }}
                                                >

                                                    {
                                                        referral2.referrals.map(
                                                            function (referral3, index3, array3) {
                                                                return <GridItem xs={12} sm={12} md={12}>

                                                                    <Button variant="contained" color="success" id={`button${index1}${index2}${index3}`}>
                                                                        {referral3.name}
                                                                    </Button>
                                                                    <Popover
                                                                        id={dinamicOpen[`open${index1}${index2}${index3}`] ? 'simple-popover' : undefined}
                                                                        open={dinamicOpen[`open${index1}${index2}${index3}`]}
                                                                        anchorEl={dinamicAnchor[`anchor${index1}${index2}${index3}`]}
                                                                        onClose={() => handleCloseDef(`${index1}${index2}${index3}`)}
                                                                        style={{ left: '27%', top: '27%' }}
                                                                    >

                                                                        {
                                                                            referral3.referrals.map(
                                                                                function (referral4, index4, array4) {
                                                                                    return <GridItem xs={12} sm={12} md={12} >
                                                                                        <Button variant="contained" color="error">
                                                                                            {referral4.name}
                                                                                        </Button>
                                                                                    </GridItem>
                                                                                })
                                                                        }

                                                                    </Popover>
                                                                </GridItem>
                                                            }
                                                        )
                                                    }
                                                </Popover>

                                            </GridItem>
                                        }
                                    )}
                                </Popover>
                            </>
                        }
                    )
                }

            </div>
        </div>
    );
}