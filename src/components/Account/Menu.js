import React from "react";
import { Alert } from "react-native";
import { List } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import useAuth from "../../hooks/useAuth";

export default function Menu() {
    const navigation = useNavigation();
    const { logout } = useAuth();

    const logoutAccount = () => {
        Alert.alert (
            "Cerrar sesión",
            "Estas seguro de que quieres salir de tu cuenta?",
            [
                {
                    text: "NO"
                },
                {
                    text: "SI",
                    onPress: logout,
                },
            ],
            { cancelable: false }
        );
    };

    return (
        <>
        <List.Section>
            <List.Subheader> Mi Cuenta </List.Subheader>
            <List.Item 
            title="Cambiar Nombre"
            description="Cambia el nombre de tu cuenta"
            left={(props) => <List.Icon {...props} icon="face" />}
            onPress={() => navigation.navigate("change-name")}
            />
            <List.Item 
            title="Cambiar E-mail"
            description="Cambia el e-mail de tu cuenta"
            left={(props) => <List.Icon {...props} icon="at" />}
            onPress={() => navigation.navigate("change-email")}
            />
            <List.Item 
            title="Cambiar Username"
            description="Cambia el nombre de usuario de tu cuenta"
            left={(props) => <List.Icon {...props} icon="sim" />}
            onPress={() => navigation.navigate("change-username")}
            />
            <List.Item 
            title="Cambiar Contraseña"
            description="Cambia la contraseña de tu cuenta"
            left={(props) => <List.Icon {...props} icon="key" />}
            onPress={() => navigation.navigate("change-password")}
            />
            <List.Item 
            title="Mis Direcciones"
            description="Administra tus direcciones de envio"
            left={(props) => <List.Icon {...props} icon="map" />}
            onPress={() => navigation.navigate("addresses")}
            />
        </List.Section>
        <List.Section>
            <List.Subheader>App</List.Subheader>
            <List.Item 
            title="Mis Pedidos"
            description="Listado de todos los pedidos"
            left={(props) => <List.Icon {...props} icon="clipboard-list" />}
            onPress={() => console.log("Ir a mis pedidos")}
            />
            <List.Item 
            title="Lista de Deseos"
            description="Listado de todos los productos que te quieres comprar"
            left={(props) => <List.Icon {...props} icon="heart" />}
            onPress={() => navigation.navigate("favorites")}
            />
            <List.Item 
            title="Cerrar Sesión"
            description="Cierra esta sesión y inicia una nueva"
            left={(props) => <List.Icon {...props} icon="logout" />}
            onPress={logoutAccount}
            />
        </List.Section>
        </>
    );
}
