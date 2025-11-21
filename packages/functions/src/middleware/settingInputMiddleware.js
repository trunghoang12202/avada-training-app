import * as yup from 'yup';

/**
 *
 * @param ctx
 * @param next
 * @returns {Promise<void>}
 */
export default async function settingInputMiddleware(ctx, next) {
  const schema = yup
    .object({
      allowShow: yup.boolean().default(true),
      displayDuration: yup
        .number()
        .integer()
        .min(1)
        .max(30)
        .default(5),
      firstDelay: yup
        .number()
        .integer()
        .min(0)
        .max(60)
        .default(8),
      popsInterval: yup
        .number()
        .integer()
        .min(0)
        .max(30)
        .default(6),
      maxPopsDisplay: yup
        .number()
        .integer()
        .min(1)
        .max(80)
        .default(12),
      position: yup
        .string()
        .oneOf(['bottom-left', 'bottom-right', 'top-left', 'top-right'])
        .default('bottom-left'),
      hideTimeAgo: yup.boolean().default(false),
      truncateProductName: yup.boolean().default(false),
      includedUrls: yup
        .string()
        .trim()
        .default(''),
      excludedUrls: yup
        .string()
        .trim()
        .default('')
    })
    .noUnknown(true, 'Invalid field in body');

  try {
    await schema.validate(ctx.request.body ?? {}, {
      abortEarly: false,
      stripUnknown: true
    });
    await next();
  } catch (err) {
    ctx.status = 400;
    ctx.body = {
      success: false,
      errors: err.errors,
      errorName: 'InvalidInputError'
    };
  }
}
