import React, { useState, useCallback } from "react";
import { StyleSheet, View, Text } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { StatusBar } from "../components/StatusBar";
import { size } from "lodash";
import { ScreenLoading } from "../components/ScreenLoading";
import { getProductCartApi } from "../api/cart";
import colors from "../styles/colors";

export default function Cart() {
    const [cart, setCart] = useState(null);

    useFocusEffect(
        useCallback(() => {
            setCart(null);
            loadCart();
        }, [])
    );

    const loadCart = async () => {
        const response = await getProductCartApi();
        setCart(response);
    };

    return (
        <>
        <StatusBar backgroundColor={colors.bgDark} barStyle="light-content" />
        {!cart ? (
            <ScreenLoading size="large" text="Cargando carrito" />
        ) : size(cart) === 0 ? (
            <Text>No tienes productos en el carrito</Text>
        ) : (
            <Text>Listado de productos</Text>
        )}
        </>
    );
}

const styles = StyleSheet.create({
    container: {},
});