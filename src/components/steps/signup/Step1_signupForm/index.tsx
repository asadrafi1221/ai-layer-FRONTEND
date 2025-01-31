import { FormControlLabel, Radio, RadioGroup, TextField } from '@mui/material';
import { motion } from 'framer-motion';
import { useAtom } from 'jotai';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { multiStepFormAtom } from '../signup_state';

interface Step1FormData {
  isLawyer: string;
  fullName: string;
  email: string;
  mobileNumber: string;
  institution: string;
  fieldOfStudy: string;
  academicLevel: string;
  legalTraining: string;
}

interface Step1Props {
  next: () => void;
}

const Step1: React.FC<Step1Props> = ({ next }) => {
  const { t } = useTranslation();
  const [formData, setFormData] = useAtom(multiStepFormAtom);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Step1FormData>({
    defaultValues: formData.step1 || {
      isLawyer: '',
      fullName: '',
      email: '',
      mobileNumber: '',
      institution: '',
      fieldOfStudy: '',
      academicLevel: '',
      legalTraining: '',
    },
  });

  const onSubmit = (data: Step1FormData) => {
    setFormData((prevFormData: typeof formData) => ({
      ...prevFormData,
      step1: data,
    }));
    next();
  };

  return (
    <motion.div
      className="min-h-[80vh] w-full border-b"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="mt-10 flex w-full flex-col gap-2 border-b p-5 md:px-10">
        <h1 className="text-lg font-[500]">{t('General information')}</h1>
        <p className="text-xs text-gray-400">
          {t('Please provide the information required in the below form')}
        </p>
      </div>

      <div className="p-5 md:p-10">
        <h1 className="text-lg font-[500]">{t('Are you a Lawyer?')}</h1>
        <div className="flex justify-around border-b py-10 font-bold lg:w-[75%]">
          <button
            type="button"
            className="rounded-xl border border-gray-600 px-10 py-2"
            onClick={() => next()}
          >
            {t('Yes')}
          </button>
          <button
            type="button"
            className="rounded-xl border bg-black px-10 py-2 text-white"
          >
            {t('No')}
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex w-full flex-col gap-5 p-5 md:p-10 lg:w-[80%]">
          <div className="flex flex-wrap justify-between gap-5 lg:gap-10">
            <TextField
              id="fullName"
              placeholder={t('Full Name')}
              variant="outlined"
              className="w-[45%]"
              {...register('fullName', {
                required: t('This field is required'),
              })}
              error={Boolean(errors.fullName)}
              helperText={errors.fullName?.message}
            />
            <TextField
              id="email"
              placeholder={t('Email Address')}
              variant="outlined"
              className="w-[45%]"
              {...register('email', {
                required: t('This field is required'),
              })}
              error={Boolean(errors.email)}
              helperText={errors.email?.message}
            />
            <TextField
              id="institution"
              placeholder={t('University Or Educational Institution')}
              variant="outlined"
              className="w-full"
              {...register('institution', {
                required: t('This field is required'),
              })}
              error={Boolean(errors.institution)}
              helperText={errors.institution?.message}
            />
          </div>

          <TextField
            id="fieldOfStudy"
            placeholder={t('Field of Study')}
            variant="outlined"
            className="w-full"
            {...register('fieldOfStudy', {
              required: t('This field is required'),
            })}
            error={Boolean(errors.fieldOfStudy)}
            helperText={errors.fieldOfStudy?.message}
          />

          <TextField
            id="academicLevel"
            placeholder={t('Academic Level')}
            variant="outlined"
            className="w-full"
            {...register('academicLevel', {
              required: t('This field is required'),
            })}
            error={Boolean(errors.academicLevel)}
            helperText={errors.academicLevel?.message}
          />

          <div>
            <h2 className="mb-5 font-[500]">
              {t('Are you currently enrolled in a legal training program?')}
            </h2>
            <Controller
              name="legalTraining"
              control={control}
              rules={{ required: t('This field is required') }}
              render={({ field }) => (
                <RadioGroup {...field} className="text-gray-700">
                  <FormControlLabel
                    value="Yes"
                    control={
                      <Radio
                        sx={{
                          color: 'black',
                          '&.Mui-checked': { color: 'black' },
                        }}
                      />
                    }
                    label={t('Yes')}
                  />
                  <FormControlLabel
                    value="No"
                    control={
                      <Radio
                        sx={{
                          color: 'black',
                          '&.Mui-checked': { color: 'black' },
                        }}
                      />
                    }
                    label={t('No')}
                  />
                </RadioGroup>
              )}
            />
            {errors.legalTraining && (
              <p className="text-xs text-red-500 sm:text-sm">
                {errors.legalTraining?.message || t('This field is required')}
              </p>
            )}
          </div>
        </div>

        <div className="my-10 flex w-full justify-end px-5 md:px-10">
          <motion.button
            whileHover={{
              scale: 1.05,
              rotate: -1,
              transition: { type: 'spring', stiffness: 400 },
            }}
            whileTap={{
              scale: 0.95,
              rotate: 1,
              transition: { type: 'spring', stiffness: 400 },
            }}
            type="submit"
            className="rounded-md bg-black px-8 py-3 text-white"
          >
            {t('Next')}
          </motion.button>
        </div>
      </form>
    </motion.div>
  );
};

export default Step1;
