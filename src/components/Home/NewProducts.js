import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text } from "react-native";
import ListProduct from "./ListProduct";
import { getLastProductsApi } from "../../api/product";
import { List } from "react-native-paper";

export default function NewProducts() {
    const [products, setProducts] = useState(null);

    useEffect(() => {
        
        (async () => {
            const response = await getLastProductsApi(20);
            setProducts(response);
        })();

    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>NUEVOS PRODUCTOS</Text>
            {products && <ListProduct products={products} />}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        marginTop: 20,
    },
    title: {
        fontWeight: "bold",
        fontSize: 20,
        marginBottom: 10,
    },
});