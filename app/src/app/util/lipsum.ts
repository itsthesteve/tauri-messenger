const LIPSUM =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas sit amet mi at erat mattis malesuada. Vestibulum eu urna vel sem egestas tincidunt ut et tellus. Vestibulum euismod metus vitae ultrices cursus. Aliquam viverra tempor diam, id mattis leo lobortis sit amet. Quisque porta tincidunt est. Suspendisse vel cursus magna. Sed efficitur consequat urna. Nunc tristique aliquam nisl, a feugiat erat pharetra ut. Integer vitae venenatis diam, vel faucibus ex. Nulla porta ullamcorper velit sed faucibus. Aliquam cursus nunc ac purus malesuada, et cursus ante molestie. Mauris ipsum nisl, hendrerit in nulla sed, laoreet mollis diam. Sed eu enim mi. Phasellus ullamcorper non orci sit amet imperdiet. Vestibulum quis eros pellentesque, rutrum orci id, tristique ex.";

const _len = LIPSUM.length;

export function randLipsum(maxLength: number = _len): string {
  const sliceEnd = Math.round(Math.random() * maxLength);
  return LIPSUM.slice(0, sliceEnd);
}
