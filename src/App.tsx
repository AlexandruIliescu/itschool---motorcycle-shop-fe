import React, { useState } from 'react';
import axios from 'axios';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, createMuiTheme, ThemeProvider, CssBaseline, IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';  // import the delete icon

interface Product {
    id: number;
    brand: string;
    colour: string;
    weight: number;
    price: number;
    yearOfManufacture: string;
}

const App: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);

    const fetchProducts = async () => {
        const response = await axios.get<Product[]>('http://localhost:8080/api/products');
        setProducts(response.data);
    };

    const deleteProduct = async (id: number) => {
        await axios.delete(`http://localhost:8080/api/products/${id}`);
        fetchProducts();
    };

    const theme = createMuiTheme({
        palette: {
            type: 'light',
            primary: {
                main: '#1976d2',
            },
        },
    });

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <div style={{ textAlign: 'center', padding: '1em' }}>
                <Button
                    variant="contained"
                    onClick={fetchProducts}
                    style={{ marginTop: '1em', backgroundColor: '#d21931', color: 'white' }} // added inline style
                >
                    Get Motorcycle List
                </Button>
                <TableContainer component={Paper} style={{ marginTop: '20px', width: '70%', margin: '20px auto' }}>
                    <Table>
                        <TableHead style={{ backgroundColor: theme.palette.primary.main }}>
                            <TableRow>
                                <TableCell style={{ color: 'white' }}>ID</TableCell>
                                <TableCell style={{ color: 'white' }}>Brand</TableCell>
                                <TableCell style={{ color: 'white' }}>Colour</TableCell>
                                <TableCell style={{ color: 'white' }}>Weight</TableCell>
                                <TableCell style={{ color: 'white' }}>Price</TableCell>
                                <TableCell style={{ color: 'white' }}>Year of Manufacture</TableCell>
                                <TableCell style={{ color: 'white' }}>Delete</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {products.map((product, index) => (
                                <TableRow key={product.id} style={{ backgroundColor: index % 2 === 0 ? '#f2f2f2' : '#fcfcfc' }}>
                                    <TableCell>{product.id}</TableCell>
                                    <TableCell>{product.brand}</TableCell>
                                    <TableCell>{product.colour}</TableCell>
                                    <TableCell>{product.weight} kg</TableCell>
                                    <TableCell>${product.price}</TableCell>
                                    <TableCell>{product.yearOfManufacture}</TableCell>
                                    <TableCell>
                                        <IconButton aria-label="delete" onClick={() => deleteProduct(product.id)} style={{ color: 'red' }}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </ThemeProvider>
    );
};

export default App;