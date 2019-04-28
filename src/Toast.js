/**
 * This exposes the native Toast module as a JS module. This has a
 * function 'show' which takes the following parameters:
 *
 * 1. String message: A string with the text to toast
 * 2. int duration: The duration of the toast. May be Toast.SHORT or
 *    Toast.LONG
 */
import {NativeModules} from 'react-native';
module.exports = NativeModules.Toast;