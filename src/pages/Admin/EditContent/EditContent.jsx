import React from 'react';
import "./EditContent.css";

import Input from '../../../shared/components/FormElements/Input';
import Button from '../../../shared/components/FormElements/Button';

import { useForm } from '../../../hooks/form-hook';
import { useHttpClient } from '../../../hooks/http-hook';

import {  VALIDATOR_REQUIRE,
  VALIDATOR_EMAIL } from "../../../shared/util/validators"; 

export default function EditContent({ content, fetchAboutUsContent }) {

  const { sendRequest } = useHttpClient();
  const [formState, inputHandler] = useForm(
    {
      aboutUsText: {
        value: "",
        isValid: true,
      },
      whyChoose_us: {
        value: "",
        isValid: true,
      }
    },
    false
  );

  const contentUpdateHandler = async (event) => {
    event.preventDefault();

    try {
      const responseData = await sendRequest(
        `http://localhost:5000/api/admin/update-aboutus-content`,
        "PATCH",
        JSON.stringify({
          aboutUsText: formState.inputs.aboutUsText.value,
          whyChooseUs: formState.inputs.whyChoose_us.value,
        }),
        {
          "Content-Type": "application/json",
          // Authorization: "Bearer " + auth.token,
        }
      );

      fetchAboutUsContent();
    } catch (err) {
      console.log(err)
    }
  };

  return (
    <div className='edit-content__container'>
      <form onSubmit={contentUpdateHandler}>
      <div className="row">
              <div className="col">
                <Input
                  element="textarea"
                  id="aboutUsText"
                  type="text"
                  label="About Us Section"
                  validators={[VALIDATOR_REQUIRE()]}
                  errorText="Please enter some text"
                  onInput={inputHandler}
                  initialValue={content.main_us_text}
                  initialValid={true}
                />
              </div>
              <div className="col">
                <Input
                  element="textarea"
                  id="whyChoose_us"
                  type="text"
                  label="Why to choose us Section"
                  validators={[VALIDATOR_REQUIRE()]}
                  errorText="Please enter your some text"
                  onInput={inputHandler}
                  initialValue={content.why_choose_us}
                  initialValid={true}
                />
              </div>
            </div>
            <Button type="submit" disabled={!formState.isValid}>Update Content</Button>
      </form>
    </div>
  )
}
