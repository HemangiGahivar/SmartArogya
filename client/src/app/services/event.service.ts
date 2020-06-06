/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */

import { Output, EventEmitter,Injectable} from '@angular/core';

@Injectable()
export class EventService {
    public IS_PLAYING_TTS: boolean;
    @Output() public audioPlaying: EventEmitter<any> = new EventEmitter();
    @Output() public audioStopping: EventEmitter<any> = new EventEmitter();
    @Output() public resetInterface: EventEmitter<any> = new EventEmitter();
    @Output() public showhide: EventEmitter<any> = new EventEmitter();
    @Output() public updateMap: EventEmitter<any> = new EventEmitter();

    constructor() {
        this.IS_PLAYING_TTS = false;
    }

    setIsPlaying(isPlaying: boolean) {
        this.IS_PLAYING_TTS = isPlaying;
    }

    getIsPlaying() {
        return this.IS_PLAYING_TTS;
    }
}
