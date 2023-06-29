import * as React from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import { DataGrid } from "@mui/x-data-grid";

import { useHttpClient } from "../../hooks/http-hook";
import DeleteModal from "../../UI/DeleteModal";
import EditUserRoleModal from "../../UI/EditUserRoleModal";

import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

export default function DataTable({ users, fetchUsers, deletedAccounts }) {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [open, setOpen] = React.useState(false);
  const [openEditModal, setOpenEditModal] = React.useState(false);
  const [selectedId, setSelectedId] = React.useState();

  const handleOpen = (id) => {
    setSelectedId(id);
    setOpen(true);
  };

  const handleOpenEdit = (id) => {
    setSelectedId(id);
    setOpenEditModal(true);
  };

  const handleClose = () => setOpen(false);

  const handleCloseEdit = () => setOpenEditModal(false);

  const updateUserRole = async (newRole) => {
    let response = await sendRequest(
      `http://localhost:5000/api/admin/update-user-role/${selectedId}`,
      "PATCH",
      JSON.stringify({
        role: newRole,
      }),
      {
        "Content-Type": "application/json",
      }
    );

    fetchUsers();
    handleCloseEdit();
  };

  const deleteUser = async (userId) => {
    try {
      let responseData = await sendRequest(
        `http://localhost:5000/api/admin/delete-user/${selectedId}`,
        "DELETE"
      );

      fetchUsers();
      handleClose();
    } catch (err) {
      console.log(err);
    }
  };

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    {
      field: "username",
      headerName: "Username",
      width: 120,
      editable: true,
    },
    {
      field: "email",
      headerName: "Email",
      width: 120,
      editable: true,
    },
    {
      field: "phonenumber",
      headerName: "Phone Number",
      width: 120,
      editable: true,
    },
    {
      field: "role",
      headerName: "Role",
      width: 90,
      editable: true,
    },
    !deletedAccounts && {
      field: "actions",
      headerName: "Actions",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <IconButton onClick={() => handleOpenEdit(params.row.id)}>
              <EditIcon sx={{ color: "lightbrown" }} />
            </IconButton>
            <IconButton onClick={() => handleOpen(params.row.id)}>
              <DeleteOutlineIcon sx={{ color: "red" }} />
            </IconButton>
          </>
        );
      },
    },
  ];

  return (
    <Box sx={{ height: 400, width: "100%" }}>
      <DeleteModal
        open={open}
        close={handleClose}
        id={selectedId}
        delete={deleteUser}
      />
      <EditUserRoleModal
        open={openEditModal}
        close={handleCloseEdit}
        id={selectedId}
        editRole={updateUserRole}
      />
      <DataGrid
        rows={users}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
        checkboxSelection
        disableRowSelectionOnClick
      />
    </Box>
  );
}
