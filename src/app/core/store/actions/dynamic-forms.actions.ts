import { createAction, props } from '@ngrx/store';
import { DocType } from '@app/core/models';
import { Form, StepType, Formly } from '@app/core/models/config/form';
import { Container } from '@app/core/models/config/form';
import { Dashboard } from '@app/core/models/config/form';

export const controlDashboard = createAction(
  '[dynamic-form] load Dashboard',
  props<{ dashboard: Array<any> }>(),
);

export const addGridsterItem = createAction(
  '[dynamic-form] add GridsterItem',
  props<{ gridsterItem: any; indexContainer: number; indexDashboard: number }>(),
);

export const deleteGridsterItem = createAction('[dynamic-form] delete GridsterItem', props<{ indexItem: number }>());

export const editGridsterItem = createAction(
  '[dynamic-form] edit GridsterItem',
  props<{ gridsterItem: any }>(),
);

export const controlGridsterItem = createAction(
  '[dynamic-form] load GridsterItem',
  props<{ index: number; gridsterItem: any }>(),
);

export const controlFormDoctype = createAction('[dynamic-form] load formDoctype', props<{ formDoctype: DocType }>());

export const controlEForm = createAction('[dynamic-form] load EForm', props<{ eform: Form }>());

export const addContainer = createAction('[dynamic-form] add contaner', props<{ container: Container }>());

export const deleteContainer = createAction('[dynamic-form] delete contaner', props<{ indexContainer: number }>());

export const editContainer = createAction(
  '[dynamic-form] edit contaner',
  props<{ container: Container; indexContainer: number }>(),
);

export const addDashboard = createAction(
  '[dynamic-form] add Dashboard',
  props<{ dashboard: Dashboard; indexContainer: number }>(),
);

export const editDashboard = createAction('[dynamic-form] edit Dashboard', props<{ dashboard: Dashboard }>());

export const deleteDashboard = createAction('[dynamic-form] delete Dashboard', props<{ indexDashboard: number }>());

export const controlJsonForm = createAction(
  '[dynamic-form] add load json form',
  props<{ jsonForm: Formly[]; models: {} }>(),
);

export const controlJsonStepForm = createAction(
  '[dynamic-form] add load json step form',
  props<{ jsonStepForm: StepType[] }>(),
);

export const editIndexContainer = createAction(
  '[dynamic-form] editIndexContainer',
  props<{ indexContainer: number }>(),
);

export const editIndexDashboard = createAction(
  '[dynamic-form] editIndexDashboard',
  props<{ indexDashboard: number }>(),
);

export const editIndexGridsterItem = createAction(
  '[dynamic-form] editIndexGridsterItem',
  props<{ indexGridsterItem: number }>(),
);

export const controlDocumentId = createAction('[dynamic-form] control documentId', props<{ documentId: string }>());

export const resetStoreDynamicForms = createAction('[dynamic-form] resetStoreDynamicForms');
