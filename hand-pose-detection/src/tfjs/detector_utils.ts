/**
 * @license
 * Copyright 2021 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */

import {DEFAULT_MPHANDS_DETECTOR_MODEL_URL_FULL, DEFAULT_MPHANDS_DETECTOR_MODEL_URL_LITE, DEFAULT_MPHANDS_ESTIMATION_CONFIG, DEFAULT_MPHANDS_LANDMARK_MODEL_URL_FULL, DEFAULT_MPHANDS_LANDMARK_MODEL_URL_LITE, DEFAULT_MPHANDS_MODEL_CONFIG} from './constants';
import {MediaPipeHandsTfjsEstimationConfig, MediaPipeHandsTfjsModelConfig} from './types';

export function validateModelConfig(modelConfig: MediaPipeHandsTfjsModelConfig):
    MediaPipeHandsTfjsModelConfig {
  if (modelConfig == null) {
    return {...DEFAULT_MPHANDS_MODEL_CONFIG};
  }

  const config: MediaPipeHandsTfjsModelConfig = {...modelConfig};

  config.runtime = 'tfjs';

  if (config.maxHands == null) {
    config.maxHands = DEFAULT_MPHANDS_MODEL_CONFIG.maxHands;
  }

  if (config.modelType == null) {
    config.modelType = DEFAULT_MPHANDS_MODEL_CONFIG.modelType;
  }

  if (config.modelType !== 'lite' && config.modelType !== 'full') {
    throw new Error(
        `Model type must be one of lite or full, but got ${config.modelType}`);
  }

  if (config.detectorModelUrl == null) {
    switch (config.modelType) {
      case 'lite':
        config.detectorModelUrl = DEFAULT_MPHANDS_DETECTOR_MODEL_URL_LITE;
        break;
      case 'full':
      default:
        config.detectorModelUrl = DEFAULT_MPHANDS_DETECTOR_MODEL_URL_FULL;
        break;
    }
  }

  if (config.landmarkModelUrl == null) {
    switch (config.modelType) {
      case 'lite':
        config.landmarkModelUrl = DEFAULT_MPHANDS_LANDMARK_MODEL_URL_LITE;
        break;
      case 'full':
      default:
        config.landmarkModelUrl = DEFAULT_MPHANDS_LANDMARK_MODEL_URL_FULL;
        break;
    }
  }

  return config;
}

export function validateEstimationConfig(
    estimationConfig: MediaPipeHandsTfjsEstimationConfig):
    MediaPipeHandsTfjsEstimationConfig {
  if (estimationConfig == null) {
    return {...DEFAULT_MPHANDS_ESTIMATION_CONFIG};
  }

  const config = {...estimationConfig};

  if (config.flipHorizontal == null) {
    config.flipHorizontal = DEFAULT_MPHANDS_ESTIMATION_CONFIG.flipHorizontal;
  }

  if (config.staticImageMode == null) {
    config.staticImageMode = DEFAULT_MPHANDS_ESTIMATION_CONFIG.staticImageMode;
  }

  return config;
}
