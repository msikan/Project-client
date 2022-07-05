import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { updateLevCoins } from '../../../../api/levCoins';
import Backdrop from "../../../commons/backdrop";
import { setUser } from '../../../../store/appSlice';
import { useDispatch } from 'react-redux';



export default function ModalSell({ open, handleClose, defaultCoins, getApiTransactions }) {

    const [coins,setCoins] = React.useState(defaultCoins || 0);
    const [loading,setLoading] = React.useState(false);

    const dispatch = useDispatch();

    console.log({ coins });

    const handleUpdateCoins = async () => {
        setLoading(true);
        await updateLevCoins({ coins, lastCoins: defaultCoins });
        dispatch(setUser({ coins }));
        await getApiTransactions();
        handleClose();
        setLoading(false);
    }

  return (
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Buy Coins</DialogTitle>
        <DialogContent>
          <DialogContentText>
            
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="lev coins"
            type="number"
            fullWidth
            variant="standard"
            value={coins}
            onChange={(event)=> setCoins(event.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleUpdateCoins}>Sell</Button>
        </DialogActions>
        <Backdrop open={loading} />
      </Dialog>
  );
}
