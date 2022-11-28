import Head from 'next/head';
import React from 'react';
import FormRegister from 'components/FormRegister';

const register = () => {
  return (
    <>
      <Head>
        <title>Registrate</title>
      </Head>

      <FormRegister />
    </>
  )
}

export default register