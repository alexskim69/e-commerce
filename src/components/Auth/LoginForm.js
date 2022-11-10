import React, { useState } from "react";
import { View, Text } from "react-native";
import { TextInput, Button} from "react-native-paper";
import { RootSiblingParent } from "react-native-root-siblings";
import { useFormik } from "formik";
import * as Yup from "yup";
import Toast from "react-native-root-toast";
import useAuth from "../../hooks/useAuth";
import { loginApi } from "../../api/user";
import { fornStyle } from "../../styles";


export default function LoginForm(props) {
    const { changeForm } = props;
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    

    const formik = useFormik ({
        initialValues: initialValues (),
        validationSchema: Yup.object(validationSchema()),
        onSubmit: async(formData) => {
            setLoading(true);
            try {
                const response = await loginApi(formData);
                if (response.statusCode) throw "Error en el usuario o contraseña";
                login(response);
            } catch (error) {
                Toast.show(error, {
                    position: Toast.positions.CENTER,
                });
                setLoading(false);
            }
        },
    });

    return (
        <View>
            <RootSiblingParent>
            <TextInput label="Email o Username" 
            style={fornStyle.input} 
            onChangeText={(text) => formik.setFieldValue("identifier", text)}
            value={formik.values.identifier} 
            error={formik.errors.identifier}
            />
            <TextInput label="Contraseña" style={fornStyle.input} 
            onChangeText={(text) => formik.setFieldValue("password", text)}
            value={formik.values.password} 
            error={formik.errors.password}
            secureTextEntry
            />
            <Button mode="contained"
            style={fornStyle.btnSucces} 
            onPress={formik.handleSubmit}
            loading={loading}
            
            > 
            Entrar </Button>
            <Button mode="text" style={fornStyle.btnText} 
            labelStyle={fornStyle.btnTextLabel}
            onPress={changeForm}
            > Registrarse </Button>
            </RootSiblingParent>
        </View>
    );

}


function initialValues () {
    return {
        identifier: "",
        password: ""
    };
}

function validationSchema () {
    return {
        identifier: Yup.string().required(true),
        password: Yup.string().required(true),
    };
}