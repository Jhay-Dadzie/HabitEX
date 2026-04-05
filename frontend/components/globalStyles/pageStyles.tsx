import { Platform, StyleSheet } from 'react-native'
import React from 'react'

export const PageStyles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 10
    },
    formContainer: {
        flex: 1,
        padding: 20,
        borderRadius: 26,
        borderWidth: 1.5,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowRadius: 24,
        elevation: 5,
        margin: 10
    },
    formTitle: {
        fontSize: 32,
        fontWeight: 600,
    },
    form: {
        flex: 1,
        gap: 10
    },
    formInput: {
        borderWidth: 2,
        borderRadius: 16,
        height: 56,
        paddingLeft: 46,
        paddingRight: 10,
    },
    label: {
        fontSize: 20,
        fontWeight: 500,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        shadowColor: '#615f5f',
        shadowOffset: {width: 0, height: 1},
        shadowRadius: 24,
        elevation: 5,
        paddingVertical: 10,
        paddingLeft: 15,
        borderWidth: 1,
        borderRadius: 16,
        marginVertical: 10,
    },
    textInput: {
        flex: 1
    },
})