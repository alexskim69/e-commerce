import React, { useState, useCallback } from "react";
import { View, StyleSheet } from "react-native";
import { TextInput, Button } from "react-native-paper";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import * as Yup from "yup";
import { useFormik } from "formik";
import Toast from "react-native-root-toast";
import { getMeApi, updateUserApi } from "../../api/user";
import useAuth from "../../hooks/useAuth";
import { fornStyle } from "../../styles";

export default function ChangeUsername() {
    const [loading, setLoading] = useState(false);
    const { auth } = useAuth ();
    const navigation = useNavigation();

    useFocusEffect(
        useCallback(() => {
            (async () => {
                const response = await getMeApi(auth.token);  
                await formik.setFieldValue("username", response.username);
                
                
            })();
        }, [])
    );

    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: Yup.object(validationSchema()),
        onSubmit: async (formData) => {
            setLoading(true);
            try {
                const response = await updateUserApi (auth, formData);
                if(response.statusCode) throw "El user ya existe";
                navigation.goBack();
            } catch (error) {
                Toast.show(error, {
                position: Toast.positions.CENTER,
                });
                formik.setFieldError("username", true);
                setLoading(false);
            }           
        },
    });

    return (
        <View style={styles.container}>

        <TextInput label="Nombre de Usuario" style={fornStyle.input} 
         onChangeText={(text) => formik.setFieldValue("username", text)}
        value={formik.values.username}
        error={formik.errors.username}
        />
        <Button 
        mode="contained" 
        style={fornStyle.btnSucces} 
        onPress={formik.handleSubmit}
        loading={loading}
        
                >
            
        Cambiar Nombre de Usuario
        </Button>

        </View>
        
    );
}

function initialValues () {
    return {
        username: "",
        
    };
}

function validationSchema() {
    return {
        username: Yup.string().required(true),
        
    };
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
});
