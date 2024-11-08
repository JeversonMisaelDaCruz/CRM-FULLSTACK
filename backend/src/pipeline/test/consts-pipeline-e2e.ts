export const pipelineMissingData = {
  name: '',
};

export const createPipeline = {
  name: 'Ganho',
};

export const createPipelineWrongData = {
  name: 2423442,
};

export const createPipelineWithMaxLength = {
  name: 'Ganho'.repeat(10),
};

export const updatePipeline = {
  name: 'Perdido',
};

export const updatePipelineWithoutData = {};

export const updatePipelineWithMaxLength = {
  name: 'Perdido'.repeat(10),
};
