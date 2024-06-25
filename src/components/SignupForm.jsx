import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

const SignupForm = ({ onClose }) => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const [errorFromServer, setErrorFromServer] = useState('');

    const onSubmit = async (data) => {
        try {
            const response = await fetch('http://localhost:4000/api/usuarios', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                const errorData = await response.json(); 
                // Verifica si el error es de correo duplicado
                if (errorData.error === 'duplicate_email') {
                    setErrorFromServer(errorData.mensaje); // Muestra el mensaje específico
                    return;
                } else {
                    throw new Error(errorData.mensaje || 'Error al registrar usuario');
                }
            }

            const responseData = await response.json();
            console.log(responseData); // Verifica la respuesta del servidor
            alert('Usuario registrado exitosamente');
            reset(); // Limpiar el formulario después de enviar los datos
            onClose(); // Cierra el formulario modal después del registro exitoso

        } catch (error) {
            console.error('Error al enviar datos:', error);
            setErrorFromServer('Error al registrar usuario. Inténtalo de nuevo más tarde.');
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-8 rounded-lg shadow-lg w-11/12 max-w-md">
                <h2 className="text-2xl text-center font-semibold mb-4">Registrarse</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                            Nombre se Usuario
                        </label>
                        <input
                            {...register('nombre', { required: 'El nombre es obligatorio' })}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="username"
                            type="text"
                            placeholder="Username"
                        />
                        {errors.nombre && <p className="text-red-500 text-xs italic">{errors.nombre.message}</p>}
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                            Email
                        </label>
                        <input
                            {...register('email', { 
                                required: 'El email es obligatorio', 
                                pattern: { 
                                    value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                                    message: 'Email no válido'
                                }
                            })}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="email"
                            type="email"
                            placeholder="Email"
                        />
                        {errors.email && <p className="text-red-500 text-xs italic">{errors.email.message}</p>}
                    </div>

                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                            Contraseña
                        </label>
                        <input
                            {...register('password', { 
                                required: 'La contraseña es obligatoria',
                                minLength: {
                                    value: 5,
                                    message: 'La contraseña debe tener al menos 5 caracteres'
                                },
                                pattern: {
                                    value: /^[a-zA-Z0-9]*$/,
                                    message: 'La contraseña debe ser alfanumérica'
                                }
                            })}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-1 leading-tight focus:outline-none focus:shadow-outline"
                            id="password"
                            type="password"
                            placeholder="********"
                        />
                        <p className="text-gray-600 text-xs italic">La contraseña debe tener al menos 5 caracteres. Ser recomienda caracteres alfanuméricos</p>
                        {errors.password && <p className="text-red-500 text-xs italic">{errors.password.message}</p>}
                    </div>

                    {errorFromServer && <p className="text-red-500 text-xs italic">{errorFromServer}</p>}

                    <div className="flex items-center justify-between">
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                            Registrarse
                        </button>
                        <button
                            type="button"
                            className="text-gray-500 hover:text-gray-800"
                            onClick={onClose}
                        >
                            Cancelar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SignupForm;
