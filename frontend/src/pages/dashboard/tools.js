import React from 'react';
import styles from '@styles/auth/Form.module.css';
import { Form, Row, Col, Alert, Button } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import FormGasolina from 'components/FormGasolina';
import FormAceite from 'components/FormAceite';
import FormTecnomecanica from 'components/FormTecnomecanica';

const tools = () => {

  const [section, setSection] = useState('FormGasolina');
  
  const defaultButton = 'warning';
  const [button1, setButton1] = useState('dark');
  const [button2, setButton2] = useState(defaultButton);
  const [button3, setButton3] = useState(defaultButton);

  useEffect(()=>{
    setButton2(defaultButton);
    setButton3(defaultButton);
  }, [button1]);

  useEffect(()=>{
    setButton1(defaultButton);
    setButton3(defaultButton);
  }, [button2]);

  useEffect(()=>{
    setButton1(defaultButton);
    setButton2(defaultButton);
  }, [button3]);

  

  return (
    <div>
      <h3 className={`${styles.formTitle}`}><i class="fas fa-tools mr-2"></i>Herramientas</h3>
      <div className={`${styles.formTitle}`}>
            <Button className={`ml-2`} onClick={() => {setSection('FormGasolina'); setButton1('dark')}} variant={button1} size="sm">
              <i class="fas fa-tint mr-2"></i> Gasolina
            </Button>
            <Button className={`ml-2`} onClick={() => {setSection('FormAceite');  setButton2('dark')}} variant={button2} size="sm">
                <i class="fas fa-oil-can mr-2"></i> Aceite
            </Button>
            <Button className={`ml-2`} onClick={() => {setSection('FormTecnomecanica'); setButton3('dark')}} variant={button3} size="sm">
                <i class="fas fa-motorcycle mr-2"></i>Tecnomecanica
            </Button>
        </div>
        <div>
        <hr></hr>
          {section == "FormGasolina" && <FormGasolina />}
          {section == "FormAceite" && <FormAceite />}
          {section == "FormTecnomecanica" && <FormTecnomecanica />}
        </div>
    </div>
  )
}

export default tools;