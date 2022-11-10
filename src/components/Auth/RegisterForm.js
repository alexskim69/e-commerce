import React, { useState } from "react";
import { View } from "react-native";
import { TextInput, Button} from "react-native-paper";
import { useFormik } from "formik";
import * as Yup from "yup";
import Toast from "react-native-root-toast";
import { registerApi } from "../../api/user";
import { fornStyle } from "../../styles";

export default function RegisterForm(props) {
    const { changeForm } = props;
    const [loading, setLoading] = useState(false);

    const formik = useFormik ({
        initialValues: initialValues(),
        validationSchema: Yup.object(validationSchema()),
        onSubmit: async(FormData) => {
            setLoading(true);
            try {
                await registerApi(FormData);
                changeForm();
            } catch (error) {
                setLoading(false);
                Toast.show("Error al registrar el Usuario", {
                    position: Toast.positions.CENTER,
                });
            }
        },
    });

    return (
        <View>
            <TextInput 
            label="Email" 
            style={fornStyle.input}
            onChangeText={(text) => formik.setFieldValue("email" , text)}
            value={formik.values.email}
            error={formik.errors.email}
            />
            <TextInput 
            label="Nombre de usuario" 
            style={fornStyle.input}
            onChangeText={(text) => formik.setFieldValue("username" , text)}
            value={formik.values.username}
            error={formik.errors.username}
            />
            <TextInput 
            label="Contraseña" 
            style={fornStyle.input}
            onChangeText={(text) => formik.setFieldValue("password" , text)}
            value={formik.values.password}
            error={formik.errors.password}
            secureTextEntry />
            <TextInput 
            label="Escribir Contraseña Nuevamente" 
            style={fornStyle.input}
            onChangeText={(text) => formik.setFieldValue("repeatPassword" , text)}
            value={formik.values.repeatPassword}
            error={formik.errors.repeatPassword}
            secureTextEntry />

            <Button mode="contained" 
            style={fornStyle.btnSucces} 
            onPress={formik.handleSubmit}
            loading={loading}
            > Registrarse</Button>
            <Button mode="text" 
            style={fornStyle.btnText}
            labelStyle={fornStyle.btnTextLabel}
            onPress={changeForm}
            > Iniciar Sesión</Button>
        </View>
    );
}


function initialValues(){
    return {
        email: "",
        username: "",
        password: "",
        repeatPassword: ""
    }


}

function validationSchema () {
    return {
        email: Yup.string().email(true).required(true),
        username: Yup.string().required(true),
        password: Yup.string().required(true),
        repeatPassword: Yup.string().required(true)
        .oneOf([Yup.ref("password")], true),

    };

}
