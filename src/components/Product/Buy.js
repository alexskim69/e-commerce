import { StyleSheet, View } from "react-native";
import React from "react";
import Toast from "react-native-root-toast";
import { Button } from "react-native-paper";
import { addProductCartApi } from "../../api/cart";

export default function Buy(props) {
    const { product, quantity } = props;

    const addProductCart = async () => {
        const response = await addProductCartApi(product._id, quantity);

        if (response) {
            Toast.show("Producto añadido al carrito", {
                position: Toast.positions.CENTER,
            });
        } else {
            Toast.show("Error al añadir el producto al carrito", {
                position: Toast.positions.CENTER,
            });
        }
    };

  return (
      <View style={{ zIndex: 1 }}>
    <Button 
    mode="contained" 
    contentStyle={styles.btnBuyContent} 
    labelStyle={styles.btnLabel}
    style={styles.btn}
    onPress={addProductCart}
    >
        Añadir al carrito
    </Button>
    </View>
  );
}

const styles = StyleSheet.create({
    btnBuyContent: {
        backgroundColor: "#0303F1",
        paddingVertical: 5,
    },
    btnLabel: {
        fontSize: 18,
    },
    btn: {
        marginTop: 20,
    },
});