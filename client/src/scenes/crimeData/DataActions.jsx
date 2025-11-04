import { Delete, Edit, Preview, CheckCircle } from '@mui/icons-material';
import { Box, IconButton, Tooltip, CircularProgress } from '@mui/material';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ViewDetails from './viewDetails';
import { updatecrime, updateDetails, UpdateUpdeatedCrimeData } from 'state';
import { clearCrimeData, deleteCrimeDatas } from 'actions/crimeData';
import { useNavigate } from 'react-router-dom';
import { updateStatus, fetchCaseStats } from 'actions';

function DataActions({ params, rowId, setRowId }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.global.currentUser);

  const { _id, status, uid } = params.row;
  const [loading, setLoading] = useState(false);

  const canMarkSolved = currentUser?.role === "admin";

  const handelUpdate = () => {
    dispatch(updateDetails(params.row));
    dispatch(UpdateUpdeatedCrimeData(_id, uid));
    navigate('/add');
  };

  const markSolved = async () => {
    if (!canMarkSolved || status === "Solved") return;

    setLoading(true);

    const result = await updateStatus({ status: "Solved" }, _id, dispatch);

    if (result) {
      dispatch(fetchCaseStats());
      dispatch(updatecrime({ ...params.row, status: "Solved" })); // ✅ update Redux
      if (setRowId) setRowId(null);
    }

    setLoading(false);
  };

  // ✅ Always check from latest row status
  const isSolved = status === "Solved";

  return (
    <Box display="flex" alignItems="center" gap={1}>
      <ViewDetails />

      <Tooltip title="View details">
        <IconButton onClick={() => dispatch(updatecrime(params.row))}>
          <Preview />
        </IconButton>
      </Tooltip>

      <Tooltip title="Edit Data">
        <IconButton onClick={handelUpdate}>
          <Edit />
        </IconButton>
      </Tooltip>

      <Tooltip title="Delete Data">
        <IconButton onClick={() => deleteCrimeDatas(params.row, currentUser, dispatch)}>
          <Delete />
        </IconButton>
      </Tooltip>

      {/* ✅ Mark as Solved */}
      <Tooltip
        title={
          !canMarkSolved
            ? "Only admin can mark as Solved"
            : isSolved
            ? "Already Solved"
            : "Mark as Solved"
        }
      >
        <span>
          <IconButton
            onClick={canMarkSolved && !isSolved ? markSolved : null}
            disabled={!canMarkSolved || loading || isSolved}
          >
            {loading ? (
              <CircularProgress size={24} />
            ) : (
              <CheckCircle
                style={{
                  color: isSolved
                    ? "green" // ✅ persist green even after reload
                    : !canMarkSolved
                    ? "lightgray"
                    : "gray",
                  transition: "color 0.3s ease",
                  cursor: !canMarkSolved ? "not-allowed" : "pointer",
                }}
              />
            )}
          </IconButton>
        </span>
      </Tooltip>
    </Box>
  );
}

export default DataActions;
