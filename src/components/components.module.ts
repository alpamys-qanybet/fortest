import { NgModule } from '@angular/core';
import { ShrinkingSegmentHeaderComponent } from './shrinking-segment-header/shrinking-segment-header';
import { ExpandableHeaderComponent } from './expandable-header/expandable-header';
@NgModule({
	declarations: [ShrinkingSegmentHeaderComponent,
    ExpandableHeaderComponent],
	imports: [],
	exports: [ShrinkingSegmentHeaderComponent,
    ExpandableHeaderComponent]
})
export class ComponentsModule {}
