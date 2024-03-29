﻿using System;
using System.Collections.Generic;
using System.Linq.Expressions;

namespace Core.Specifications
{
    public interface ISpecification<T>
    {
        /// <summary>
        /// Where criteria 
        /// </summary>
        Expression<Func<T, bool>> Criteria { get; }

        /// <summary>
        /// Includes operations
        /// </summary>
        List<Expression<Func<T, object>>> Includes { get; }

        Expression<Func<T, object>> OrderBy { get; }
        Expression<Func<T, object>> OrderByDesc { get; }
        int Skip { get; }
        int Take { get; }
        bool IsPagingEnabled { get; }
    }
}