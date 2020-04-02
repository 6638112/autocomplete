import React from 'react';
import {
  AutocompleteApi,
  AutocompleteState,
} from '@francoischalifour/autocomplete-core';

import { RecentDocSearchHit } from '../types';

import { ResetIcon } from '../SearchBox/ResetIcon';

interface EmptyScreenProps
  extends AutocompleteApi<
  RecentDocSearchHit,
  React.FormEvent,
  React.MouseEvent,
  React.KeyboardEvent
  > {
  state: AutocompleteState<RecentDocSearchHit>;
  hasSuggestions: boolean;
  onItemClick(item: RecentDocSearchHit): void;
  onAction(search: RecentDocSearchHit): void;
}

export function EmptyScreen(props: EmptyScreenProps) {
  if (props.state.status === 'idle' && props.hasSuggestions === false) {
    return (
      <div className="DocSearch-EmptyScreen">
        <p className="DocSearch-Help">Your search history will appear here.</p>
      </div>
    );
  }

  return (
    <div className="DocSearch-Dropdown-Container">
      {props.state.suggestions.map(({ source, items }, index) => {
        return (
          <section key={['recent', index].join(':')} className="DocSearch-Hits">
            <div className="DocSearch-Hit-source">Recent</div>

            <ul {...props.getMenuProps()}>
              {items.map(item => {
                return (
                  <li
                    key={['recent', item.objectID].join(':')}
                    className="DocSearch-Hit"
                    {...props.getItemProps({
                      item,
                      source,
                      onClick() {
                        props.onItemClick(item);
                      },
                    })}
                  >
                    <a href={item.url}>
                      <div className="DocSearch-Hit-Container">
                        <div className="DocSearch-Hit-icon">
                          <svg width="20" height="20" viewBox="0 0 20 20">
                            <g
                              stroke="currentColor"
                              fill="none"
                              fillRule="evenodd"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path d="M3.18 6.6a8.23 8.23 0 1112.93 9.94h0a8.23 8.23 0 01-11.63 0" />
                              <path d="M6.44 7.25H2.55V3.36M10.45 6v5.6M10.45 11.6L13 13" />
                            </g>
                          </svg>
                        </div>

                        {item.hierarchy[item.type] && item.type === 'lvl1' && (
                          <div className="DocSearch-Hit-content-wrapper">
                            <span className="DocSearch-Hit-title">
                              {item.hierarchy.lvl1}
                            </span>
                            {item.content && (
                              <span className="DocSearch-Hit-path">
                                {item.content}
                              </span>
                            )}
                          </div>
                        )}

                        {item.hierarchy[item.type] &&
                          (item.type === 'lvl2' ||
                            item.type === 'lvl3' ||
                            item.type === 'lvl4' ||
                            item.type === 'lvl5' ||
                            item.type === 'lvl6') && (
                            <div className="DocSearch-Hit-content-wrapper">
                              <span className="DocSearch-Hit-title">
                                {item.hierarchy[item.type]}
                              </span>
                              <span className="DocSearch-Hit-path">
                                {item.hierarchy.lvl1}
                              </span>
                            </div>
                          )}

                        {item.type === 'content' && (
                          <div className="DocSearch-Hit-content-wrapper">
                            <span className="DocSearch-Hit-title">
                              {item.content}
                            </span>
                            <span className="DocSearch-Hit-path">
                              {item.hierarchy.lvl1}
                            </span>
                          </div>
                        )}

                        <div className="DocSearch-Hit-action">
                          <button
                            className="DocSearch-Hit-action-button"
                            title="Delete this search"
                            onClick={event => {
                              event.preventDefault();
                              event.stopPropagation();

                              props.onAction(item);
                            }}
                          >
                            <ResetIcon />
                          </button>
                        </div>
                      </div>
                    </a>
                  </li>
                );
              })}
            </ul>
          </section>
        );
      })}
    </div>
  );
}