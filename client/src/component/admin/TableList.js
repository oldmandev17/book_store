import { IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { useState } from 'react';
import { AiFillDelete, AiFillEdit, AiOutlineEdit } from 'react-icons/ai';
import ModalEdit from './cate/ModalList/ModalEditCate';
import ModalDelete from './ModalDelete';
import { MdDeleteOutline } from 'react-icons/md';
import ModalEditCate from './cate/ModalList/ModalEditCate';
import ModalEditProduct from './product/ModalEditProduct';
import ModalEditAuthor from './author/ModalEditAuthor';

const TableList = ({ rows, columns, type }) => {

    const [showModalEdit, setShowModalEdit] = useState(false);
    const [showModalDelete, setShowModalDelete] = useState(false);
    const [selectedRow, setSelectedRow] = useState(null);

    const handleOpenModalDelete = () => {
        setShowModalDelete(true);
    };

    const handleOpenModalEdit = (id) => {
        // get the data of the row with the given id
        const rowData = rows.find(row => row.id === id);
        setSelectedRow(rowData);
        setShowModalEdit(true);
    };

    const handleCloseModalEdit = () => {
        setShowModalEdit(false);
        setSelectedRow(null);
    };

    const handleCloseModalDelete = () => {
        setShowModalDelete(false);
        setSelectedRow(null);
    };

    const renderModalEdit = () => {
        if (type === "category") {
            return <ModalEditCate
                handleClose={handleCloseModalEdit}
                show={showModalEdit}
                data={selectedRow}
                type={type}
            />;
        }
        else if (type === "product") {
            return <ModalEditProduct
                handleClose={handleCloseModalEdit}
                show={showModalEdit}
                data={selectedRow}
                type={type}
            />;
        }
        else if (type === "author") {
            return <ModalEditAuthor
                handleClose={handleCloseModalEdit}
                show={showModalEdit}
                data={selectedRow}
                type={type}
            />;
        }
    };

    const renderModalDelete = () => {
        if (type === "category") {
            return <ModalDelete
                handleClose={handleCloseModalDelete}
                show={showModalDelete}
                title="Bạn thực sự muốn xoá thể loại này ?"
                content="Xác nhận"
                type={type}
            />;
        }
        else if (type === "product") {
            return <ModalDelete
                handleClose={handleCloseModalDelete}
                show={showModalDelete}
                title="Bạn thực sự muốn xoá sản phẩm này ?"
                content="Xác nhận"
                type={type}
            />;
        }
        else if (type === "author") {
            return <ModalDelete
                handleClose={handleCloseModalDelete}
                show={showModalDelete}
                title="Bạn thực sự muốn xoá tác giả này ? Thay vào đó bạn có thể ẩn tác giả"
                content="Xác nhận"
                type={type}
            />;
        }
    };

    return (
        <>
            <TableContainer component={Paper} className='p-12 mt-8'>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow >
                            {columns.map((column, index) => (
                                <TableCell key={index} className='!text-left !font-bold KumbhSans'>{column}</TableCell>
                            ))}
                            <TableCell className='!text-center !font-semibold KumbhSans'>Thao tác</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row, rowIndex) => (
                            <TableRow key={rowIndex}>
                                {Object.keys(row).map((key, cellIndex) => (
                                    <TableCell key={cellIndex} align="left">
                                        {row[key]}
                                    </TableCell>
                                ))}
                                <TableCell className='!text-center'>
                                    <IconButton onClick={() => handleOpenModalEdit(row.id)}>
                                        <AiOutlineEdit color='orange' />
                                    </IconButton>
                                    <IconButton onClick={() => handleOpenModalDelete()}>
                                        <MdDeleteOutline color='red' />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer >
            {renderModalEdit()}
            {renderModalDelete()}
        </>
    )
}

export default TableList;
