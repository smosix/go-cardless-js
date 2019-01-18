export function attributeDeprecationWarning(
  attr: any,
  prevAttr: string,
  newAttr: string
) {
  if (attr) {
    console.warn(
      `deprecation warning: ${prevAttr} is being deprecated, please use ${newAttr}`
    );
  }
}
export function apiDeprecationWarning(prevAttr: string, newAttr: string) {
  console.warn(
    `deprecation warning: the api named ${prevAttr} is being deprecated, please use the new ${newAttr}`
  );
}
export function responseDeprecationWarning(attr: string) {
  console.warn(
    `deprecation warning: the response format for requests is changing. the new format will no longer having resources nested under their envelope name ${attr}`
  );
}
