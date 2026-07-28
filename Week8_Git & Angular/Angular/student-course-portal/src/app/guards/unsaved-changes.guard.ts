import { CanDeactivateFn } from '@angular/router';

// Interface that components must implement to use this guard
export interface CanComponentDeactivate {
  canDeactivate(): boolean;
}

// Warns the user if they try to leave a page with unsaved form changes
export const unsavedChangesGuard: CanDeactivateFn<CanComponentDeactivate> = (component) => {
  if (component.canDeactivate && !component.canDeactivate()) {
    return confirm('You have unsaved changes. Are you sure you want to leave?');
  }
  return true;
};
